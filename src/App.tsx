import { useEffect, useState } from 'react'
import './App.css'
import type { GameState, PuzzleState, Question, RewardType, Team } from './types'
import { initializeQuestions, saveQuestions } from './questions'

const PUZZLE_ROWS = 2
const PUZZLE_COLS = 5
const PUZZLE_SIZE = PUZZLE_ROWS * PUZZLE_COLS

function createInitialPuzzle(): PuzzleState {
  return { rows: PUZZLE_ROWS, cols: PUZZLE_COLS, revealed: new Array(PUZZLE_SIZE).fill(false) }
}

function createInitialTeams(): Team[] {
  return [
    { id: 't1', name: 'Nhóm 1', score: 0 },
    { id: 't2', name: 'Nhóm 2', score: 0 },
    { id: 't3', name: 'Nhóm 3', score: 0 },
    { id: 't4', name: 'Nhóm 4', score: 0 },
    { id: 't5', name: 'Nhóm 5', score: 0 },
  ]
}

function loadGameState(questions: Question[]): GameState {
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('olympia_game_state_v1')
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<GameState>
        const qMap = new Map((parsed.questions ?? []).map((q) => [q.id, q as Question]))
        const mergedQuestions = questions.map((q) => ({
          ...q,
          used: qMap.get(q.id)?.used ?? q.used,
          points: qMap.get(q.id)?.points ?? q.points,
        }))
        // ensure 5 teams exist (migration from older saves)
        const defaults = createInitialTeams()
        const existing = Array.isArray(parsed.teams) ? (parsed.teams as Team[]) : []
        const mergedTeams: Team[] = []
        for (const def of defaults) {
          const found = existing.find((t) => t.id === def.id)
          mergedTeams.push(found ? found : def)
        }
        return {
          teams: mergedTeams,
          activeTeamId: parsed.activeTeamId ?? 't1',
          questions: mergedQuestions,
          puzzle: parsed.puzzle && Array.isArray(parsed.puzzle.revealed)
            ? (parsed.puzzle as PuzzleState)
            : createInitialPuzzle(),
        }
      }
    }
  } catch {}
  return {
    teams: createInitialTeams(),
    activeTeamId: 't1',
    questions,
    puzzle: createInitialPuzzle(),
  }
}

function saveGameState(state: GameState) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('olympia_game_state_v1', JSON.stringify(state))
    }
  } catch {}
}

function App() {
  const [questions, setQuestions] = useState<Question[]>(() => initializeQuestions())
  const [state, setState] = useState<GameState>(() => loadGameState(questions))
  const [showQuestionId, setShowQuestionId] = useState<number | null>(null)
  const [showRevealChooser, setShowRevealChooser] = useState(false)
  const [showSolveModal, setShowSolveModal] = useState(false)
  const [pendingReward, setPendingReward] = useState<RewardType | null>(null)
  const [stealTargetTeamId, setStealTargetTeamId] = useState<string>('t2')

  useEffect(() => {
    // keep questions in sync storage (for points and used state)
    saveQuestions(state.questions)
    saveGameState(state)
  }, [state])

  // activeTeam can be derived when needed; avoid memo to keep code simple

  function setQuestionsAndState(updater: (prev: GameState) => GameState) {
    setState((prev) => updater(prev))
  }

  function handleLetterClick(id: number) {
    const q = state.questions.find((x) => x.id === id)
    if (!q || q.used) return
    setShowQuestionId(id)
  }

  function markQuestionUsed(id: number) {
    setQuestionsAndState((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === id ? { ...q, used: true } : q)),
    }))
  }

  function applyScore(teamId: string, delta: number) {
    setQuestionsAndState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t)),
    }))
  }

  function onAnswer(correct: boolean) {
    if (showQuestionId == null) return
    const q = state.questions.find((x) => x.id === showQuestionId)
    if (!q) return

    // Mark used
    markQuestionUsed(q.id)
    setShowQuestionId(null)

    if (correct) {
      applyScore(state.activeTeamId, q.points)
      setShowRevealChooser(true)
    }
  }

  function onRevealTile(idx: number) {
    if (state.puzzle.revealed[idx]) return
    setQuestionsAndState((prev) => ({
      ...prev,
      puzzle: { ...prev.puzzle, revealed: prev.puzzle.revealed.map((r, i) => (i === idx ? true : r)) },
    }))
    setShowRevealChooser(false)
  }

  function onSolveCorrect() {
    // choose random reward
    const rewards: RewardType[] = ['plus5', 'steal', 'double', 'swap']
    const chosen = rewards[Math.floor(Math.random() * rewards.length)]
    setPendingReward(chosen)
  }

  function applyReward() {
    if (!pendingReward) return
    if (pendingReward === 'plus5') {
      applyScore(state.activeTeamId, 5)
      closeSolveModal()
      return
    }
    if (pendingReward === 'double') {
      const team = state.teams.find((t) => t.id === state.activeTeamId)!
      applyScore(state.activeTeamId, team.score) // +current => x2
      closeSolveModal()
      return
    }
    if (pendingReward === 'steal') {
      if (stealTargetTeamId === state.activeTeamId) return
      const victim = state.teams.find((t) => t.id === stealTargetTeamId)
      const victimScore = victim ? victim.score : 0
      applyScore(stealTargetTeamId, -victimScore)
      applyScore(state.activeTeamId, victimScore)
      closeSolveModal()
      return
    }
    if (pendingReward === 'swap') {
      if (stealTargetTeamId === state.activeTeamId) return
      setQuestionsAndState((prev) => {
        const teams = prev.teams.map((t) => ({ ...t }))
        const aIdx = teams.findIndex((t) => t.id === prev.activeTeamId)
        const bIdx = teams.findIndex((t) => t.id === stealTargetTeamId)
        if (aIdx >= 0 && bIdx >= 0) {
          const tmp = teams[aIdx].score
          teams[aIdx].score = teams[bIdx].score
          teams[bIdx].score = tmp
        }
        return { ...prev, teams }
      })
      closeSolveModal()
      return
    }
  }

  function closeSolveModal() {
    setPendingReward(null)
    setShowSolveModal(false)
  }

  function resetGame() {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('olympia_questions_v1')
        window.localStorage.removeItem('olympia_game_state_v1')
      }
    } catch {}
    const qs = initializeQuestions()
    const newState: GameState = {
      teams: createInitialTeams(),
      activeTeamId: 't1',
      questions: qs,
      puzzle: createInitialPuzzle(),
    }
    setQuestions(qs)
    setState(newState)
  }

  return (
    <div className="container">
      <h1>Mảnh ghép bí ẩn</h1>

      <div className="topbar">
        <div className="teams">
          {state.teams.map((t) => (
            <div key={t.id} className={`team ${t.id === state.activeTeamId ? 'active' : ''}`} onClick={() => setState({ ...state, activeTeamId: t.id })}>
              <div className="team-name">{t.name}</div>
              <div className="team-score">{t.score}</div>
            </div>
          ))}
        </div>
        <div className="actions">
          <button onClick={() => setShowSolveModal(true)}>Giải mã bức tranh</button>
          <button className="secondary" onClick={resetGame}>Chơi lại</button>
        </div>
      </div>

      <div className="puzzle-wrapper">
        <img className="puzzle-image" src="/puzzle.png" alt="Bức tranh bí ẩn" />
        <div className="overlay-grid" style={{ gridTemplateColumns: `repeat(${PUZZLE_COLS}, 1fr)`, gridTemplateRows: `repeat(${PUZZLE_ROWS}, 1fr)` }}>
          {state.puzzle.revealed.map((rev, idx) => (
            <div key={idx} className={`tile ${rev ? 'revealed' : ''}`}>{rev ? '' : '?'}</div>
          ))}
        </div>
      </div>

      <div className="board">
        {state.questions.map((q) => (
          <button key={q.id} className={`letter ${q.used ? 'used' : ''}`} onClick={() => handleLetterClick(q.id)} disabled={q.used}>
            <span className="letter-char">{q.letter}</span>
            {q.used && <span className="used-mark">X</span>}
          </button>
        ))}
      </div>

      {showQuestionId != null && (
        <QuestionModal
          q={state.questions.find((x) => x.id === showQuestionId)!}
          onClose={() => setShowQuestionId(null)}
          onAnswer={onAnswer}
        />
      )}

      {showRevealChooser && (
        <RevealChooser
          puzzle={state.puzzle}
          onClose={() => setShowRevealChooser(false)}
          onPick={onRevealTile}
        />
      )}

      {showSolveModal && (
        <SolveModal
          teams={state.teams}
          activeTeamId={state.activeTeamId}
          pendingReward={pendingReward}
          stealTargetTeamId={stealTargetTeamId}
          setStealTargetTeamId={setStealTargetTeamId}
          onClose={closeSolveModal}
          onCorrect={onSolveCorrect}
          onApplyReward={applyReward}
        />
      )}
    </div>
  )
}

function QuestionModal({ q, onClose, onAnswer }: { q: Question; onClose: () => void; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  function onPick(label: string) {
    if (selected) return
    setSelected(label)
    setShowResult(true)
    const isCorrect = label === q.correctLabel
    window.setTimeout(() => {
      onAnswer(isCorrect)
    }, 3000)
  }
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="badge">{q.category}</div>
            <div className="q-title">{q.text}</div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="points-row">Điểm câu hỏi: <b>{q.points}</b></div>
        <div className="choices">
          {q.choices.map((c) => (
            <button key={c.label} className={`choice clickable ${showResult && c.label === q.correctLabel ? 'correct' : ''} ${showResult && selected === c.label && c.label !== q.correctLabel ? 'wrong' : ''} ${selected === c.label ? 'selected' : ''}`} onClick={() => onPick(c.label)} disabled={!!selected}>
              <b>{c.label}.</b> {c.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function RevealChooser({ puzzle, onPick, onClose }: { puzzle: PuzzleState; onPick: (idx: number) => void; onClose: () => void }) {
  return (
    <div className="modal-backdrop">
      <div className="modal large">
        <div className="modal-header">
          <div className="q-title">Chọn 1 mảnh để mở</div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="grid-chooser" style={{ gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`, gridTemplateRows: `repeat(${puzzle.rows}, 1fr)` }}>
          {puzzle.revealed.map((rev, idx) => (
            <button key={idx} className={`chooser-tile ${rev ? 'disabled' : ''}`} onClick={() => (!rev ? onPick(idx) : undefined)} disabled={rev}>
              {rev ? 'Đã mở' : 'Mở'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SolveModal({
  teams,
  activeTeamId,
  pendingReward,
  stealTargetTeamId,
  setStealTargetTeamId,
  onClose,
  onCorrect,
  onApplyReward,
}: {
  teams: Team[]
  activeTeamId: string
  pendingReward: RewardType | null
  stealTargetTeamId: string
  setStealTargetTeamId: (id: string) => void
  onClose: () => void
  onCorrect: () => void
  onApplyReward: () => void
}) {
  const activeTeam = teams.find((t) => t.id === activeTeamId)!
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="q-title">Giải mã bức tranh</div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        {!pendingReward ? (
          <>
            <div className="solve-note">Đánh dấu đúng nếu đội <b>{activeTeam.name}</b> giải được chính xác.</div>
            <div className="modal-actions">
              <button className="success" onClick={onCorrect}>Đánh dấu đúng và nhận thưởng ngẫu nhiên</button>
            </div>
          </>
        ) : (
          <>
            <div className="solve-note">Phần thưởng ngẫu nhiên cho <b>{activeTeam.name}</b>:</div>
            {pendingReward === 'plus5' && <div className="reward">+5 điểm</div>}
            {pendingReward === 'double' && <div className="reward">x2 tổng điểm hiện có</div>}
            {pendingReward === 'steal' && (
              <div className="reward">
                Cướp điểm của một nhóm bất kỳ:
                <select value={stealTargetTeamId} onChange={(e) => setStealTargetTeamId(e.target.value)}>
                  {teams.filter((t) => t.id !== activeTeamId).map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.score}đ)</option>
                  ))}
                </select>
              </div>
            )}
            {pendingReward === 'swap' && (
              <div className="reward">
                Đổi điểm với một nhóm:
                <select value={stealTargetTeamId} onChange={(e) => setStealTargetTeamId(e.target.value)}>
                  {teams.filter((t) => t.id !== activeTeamId).map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.score}đ)</option>
                  ))}
                </select>
              </div>
            )}
            <div className="modal-actions">
              <button className="success" onClick={onApplyReward}>Áp dụng</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
