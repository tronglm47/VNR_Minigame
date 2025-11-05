import type { Question } from './types';

const baseQuestions: Omit<Question, 'points' | 'used'>[] = [
  {
    id: 1,
    letter: 'A',
    category: '1. Về sự ra đời của Đảng (2/1930)',
    text:
      'Câu 1: Hội nghị thành lập Đảng Cộng sản Việt Nam (2/1930) do ai chủ trì?',
    choices: [
      { label: 'A', text: 'Trần Phú' },
      { label: 'B', text: 'Nguyễn Ái Quốc' },
      { label: 'C', text: 'Lê Hồng Phong' },
      { label: 'D', text: 'Hà Huy Tập' },
    ],
    correctLabel: 'B',
  },
  {
    id: 2,
    letter: 'B',
    category: '1. Về sự ra đời của Đảng (2/1930)',
    text:
      'Câu 2: Hội nghị thành lập Đảng Cộng sản Việt Nam (1/1930) diễn ra tại đâu?',
    choices: [
      { label: 'A', text: 'Pác Pó (Cao Bằng)' },
      { label: 'B', text: 'Cửu Long (Hồng Kông)' },
      { label: 'C', text: 'Ma Cao (Trung Quốc)' },
      { label: 'D', text: 'Bà Điểm (Hóc Môn, Gia Định)' },
    ],
    correctLabel: 'B',
  },
  {
    id: 3,
    letter: 'C',
    category: '1. Về sự ra đời của Đảng (2/1930)',
    text:
      'Câu 3: Cương lĩnh chính trị đầu tiên của Đảng (2/1930) xác định nhiệm vụ chiến lược của cách mạng Việt Nam là gì?',
    choices: [
      { label: 'A', text: 'Thực hiện thổ địa cách mạng triệt để.' },
      {
        label: 'B',
        text: 'Làm tư sản dân quyền c.m và thổ địa c.m để đi tới xã hội cộng sản.',
      },
      { label: 'C', text: 'Giải phóng dân tộc, đấu tranh chống phát xít.' },
      { label: 'D', text: 'Xây dựng chủ nghĩa xã hội.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 4,
    letter: 'D',
    category: '1. Về sự ra đời của Đảng (2/1930)',
    text:
      'Câu 4: Cương lĩnh chính trị đầu tiên của Đảng xác định kẻ thù chính của cách mạng Việt Nam là gì?',
    choices: [
      { label: 'A', text: 'Chủ nghĩa phát xít Nhật.' },
      { label: 'B', text: 'Đế quốc Pháp.' },
      { label: 'C', text: 'Đế quốc chủ nghĩa Pháp và bọn phong kiến.' },
      { label: 'D', text: 'Bọn phản động tay sai.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 5,
    letter: 'E',
    category: '1. Về sự ra đời của Đảng (2/1930)',
    text:
      'Câu 5: Việc thành lập Đảng Cộng sản Việt Nam (2/1930) đã chấm dứt điều gì trong lịch sử cứu nước của dân tộc?',
    choices: [
      { label: 'A', text: 'Sự đối đầu giữa các tổ chức cộng sản.' },
      { label: 'B', text: 'Khủng hoảng đường lối cứu nước.' },
      { label: 'C', text: 'Sự cai trị của thực dân Pháp.' },
      { label: 'D', text: 'Phong trào dân chủ tư sản.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 6,
    letter: 'F',
    category: '2. Giai đoạn 1930 – 1935',
    text:
      'Câu 6: Luận cương chính trị (10/1930) xác định nhiệm vụ nào là "cái cốt" của cách mạng tư sản dân quyền?',
    choices: [
      { label: 'A', text: 'Phản đế (chống đế quốc Pháp).' },
      { label: 'B', text: 'Thổ địa cách mạng.' },
      { label: 'C', text: 'Phát triển dân chủ.' },
      { label: 'D', text: 'Chống chủ nghĩa phát xít.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 7,
    letter: 'G',
    category: '2. Giai đoạn 1930 – 1935',
    text:
      'Câu 7: Phong trào cách mạng 1930-1931 đạt đỉnh cao với sự ra đời của hình thức chính quyền nào?',
    choices: [
      { label: 'A', text: 'Xứ ủy Trung Kỳ.' },
      { label: 'B', text: 'Ủy ban Kháng chiến.' },
      { label: 'C', text: 'Xô Viết Nghệ Tĩnh.' },
      { label: 'D', text: 'Chính phủ Công nông binh.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 8,
    letter: 'H',
    category: '2. Giai đoạn 1930 – 1935',
    text:
      'Câu 8: Bài học kinh nghiệm quan trọng nhất mà phong trào 1930-1931 mang lại là gì?',
    choices: [
      { label: 'A', text: 'Khẳng định sự sáng tạo trong đấu tranh.' },
      {
        label: 'B',
        text: 'Khẳng định trong thực tế quyền lãnh đạo và năng lực của Đảng.',
      },
      { label: 'C', text: 'Kết hợp đấu tranh chính trị và vũ trang.' },
      { label: 'D', text: 'Phát triển tinh thần yêu nước.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 9,
    letter: 'I',
    category: '3. Phong trào Dân chủ (1936 – 1939)',
    text:
      'Câu 9: Hội nghị Ban Chấp hành Trung ương (7/1936) nhận định kẻ thù nguy hiểm trước mắt của cách mạng thế giới là gì?',
    choices: [
      { label: 'A', text: 'Chủ nghĩa đế quốc.' },
      { label: 'B', text: 'Chủ nghĩa thực dân.' },
      { label: 'C', text: 'Chủ nghĩa phátxít.' },
      { label: 'D', text: 'Địa chủ phong kiến.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 10,
    letter: 'J',
    category: '3. Phong trào Dân chủ (1936 – 1939)',
    text:
      'Câu 10: Nhiệm vụ trước mắt của cách mạng Đông Dương trong giai đoạn 1936-1939 là gì?',
    choices: [
      {
        label: 'A',
        text: 'Chống phát xít, chống chiến tranh, bảo vệ dân chủ và hòa bình.',
      },
      { label: 'B', text: 'Đánh đổ đế quốc Pháp và phong kiến.' },
      { label: 'C', text: 'Giành độc lập dân tộc.' },
      { label: 'D', text: 'Tiến hành cách mạng ruộng đất.' },
    ],
    correctLabel: 'A',
  },
  {
    id: 11,
    letter: 'K',
    category: '3. Phong trào Dân chủ (1936 – 1939)',
    text:
      'Câu 11: Hình thức tổ chức đấu tranh chủ yếu của Đảng trong phong trào 1936-1939 là gì?',
    choices: [
      { label: 'A', text: 'Bí mật và bất hợp pháp.' },
      {
        label: 'B',
        text:
          'Công khai, nửa công khai, hợp pháp, nửa hợp pháp kết hợp bí mật và bất hợp pháp.',
      },
      { label: 'C', text: 'Khởi nghĩa từng phần.' },
      { label: 'D', text: 'Võ trang bạo động.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 12,
    letter: 'L',
    category: '3. Phong trào Dân chủ (1936 – 1939)',
    text:
      'Câu 12: Tổ chức mặt trận dân tộc thống nhất mà Đảng chủ trương thành lập trong giai đoạn 1936-1939 là gì?',
    choices: [
      { label: 'A', text: 'Mặt trận Nhân dân Phản đế Đông Dương.' },
      { label: 'B', text: 'Mặt trận Việt Minh.' },
      { label: 'C', text: 'Mặt trận Dân chủ Đông Dương.' },
      { label: 'D', text: 'Hội Liên Hiệp thuộc địa.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 13,
    letter: 'M',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 13: Hội nghị Ban Chấp hành Trung ương Đảng (11/1939) nhận định vấn đề nào là tối cao, là nhiệm vụ trung tâm trong giai đoạn này?',
    choices: [
      { label: 'A', text: 'Điền địa (cách mạng ruộng đất).' },
      { label: 'B', text: 'Quyền lợi của bộ phận, của giai cấp.' },
      { label: 'C', text: 'Giải phóng dân tộc.' },
      { label: 'D', text: 'Đấu tranh chính trị đòi dân sinh dân chủ.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 14,
    letter: 'N',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 14: Nguyễn Ái Quốc trở về nước (Việt Nam) trực tiếp lãnh đạo cách mạng vào thời gian nào?',
    choices: [
      { label: 'A', text: '5/6/1911' },
      { label: 'B', text: '2/1930' },
      { label: 'C', text: '28/1/1941' },
      { label: 'D', text: '9/3/1945' },
    ],
    correctLabel: 'C',
  },
  {
    id: 15,
    letter: 'O',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 15: Tổ chức nào được thành lập tại Hội nghị Trung ương 8 (5/1941) theo chủ trương của Nguyễn Ái Quốc?',
    choices: [
      { label: 'A', text: 'Hội Việt Nam Cách mạng Thanh niên.' },
      { label: 'B', text: 'Mặt trận Thống nhất Phản đế Đông Dương.' },
      { label: 'C', text: 'Việt Nam Độc lập đồng minh (Việt Minh).' },
      { label: 'D', text: 'Hội Văn hóa cứu quốc.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 16,
    letter: 'P',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 16: Hội nghị Trung ương 8 (5/1941) xác định nhiệm vụ trung tâm của toàn Đảng, toàn dân trong giai đoạn này là gì?',
    choices: [
      { label: 'A', text: 'Đánh đổ Pháp - Nhật.' },
      { label: 'B', text: 'Đẩy mạnh công tác tuyên truyền.' },
      { label: 'C', text: 'Chuẩn bị khởi nghĩa vũ trang.' },
      { label: 'D', text: 'Mở rộng mặt trận dân tộc thống nhất.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 17,
    letter: 'Q',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text: 'Câu 17: Đội Việt Nam Tuyên truyền giải phóng quân được thành lập vào thời gian nào?',
    choices: [
      { label: 'A', text: '1/1941' },
      { label: 'B', text: '9/1944' },
      { label: 'C', text: '22/12/1944' },
      { label: 'D', text: '15/5/1945' },
    ],
    correctLabel: 'C',
  },
  {
    id: 18,
    letter: 'R',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 18: Sự kiện nào khiến Ban Thường vụ Trung ương Đảng ra Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (3/1945)?',
    choices: [
      { label: 'A', text: 'Đức đầu hàng Đồng minh.' },
      {
        label: 'B',
        text: 'Phát xít Nhật đảo chính Pháp, độc chiếm Đông Dương.',
      },
      { label: 'C', text: 'Quân Đồng minh đổ bộ vào Đông Dương.' },
      { label: 'D', text: 'Phát xít Nhật tuyên bố đầu hàng Đồng minh.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 19,
    letter: 'S',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 19: Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (12/3/1945) xác định kẻ thù trước mắt duy nhất của nhân dân Đông Dương là ai?',
    choices: [
      { label: 'A', text: 'Đế quốc Pháp.' },
      { label: 'B', text: 'Bọn phản động tay sai.' },
      { label: 'C', text: 'Phát xít Nhật.' },
      { label: 'D', text: 'Đế quốc Mỹ.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 20,
    letter: 'T',
    category: '4. Phong trào Giải phóng dân tộc (1939 – 1945)',
    text:
      'Câu 20: Khẩu hiệu đấu tranh nào được Đảng ta vận dụng hiệu quả nhất để giải quyết nạn đói trong cao trào kháng Nhật cứu nước (1945)?',
    choices: [
      { label: 'A', text: 'Độc lập Dân tộc và Chủ nghĩa xã hội.' },
      { label: 'B', text: 'Phản đối xâm lược, Chính quyền nhân dân.' },
      { label: 'C', text: '“Phá kho thóc, giải quyết nạn đói”.' },
      { label: 'D', text: 'Hòa bình, dân chủ.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 21,
    letter: 'U',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text:
      'Câu 21: Thời cơ để tiến hành Tổng khởi nghĩa Tháng Tám (1945) tồn tại trong khoảng thời gian nào?',
    choices: [
      {
        label: 'A',
        text:
          'Từ khi Nhật tiến hành đảo chính Pháp đến trước khi Nhật đầu hàng.',
      },
      {
        label: 'B',
        text:
          'Từ khi Nhật đầu hàng Đồng minh đến trước khi quân Đồng minh vào Đông Dương.',
      },
      {
        label: 'C',
        text:
          'Từ khi thành lập Ủy ban Khởi nghĩa đến khi Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.',
      },
      {
        label: 'D',
        text: 'Từ khi Mỹ ném bom nguyên tử xuống Nhật đến khi Đồng minh đổ bộ.',
      },
    ],
    correctLabel: 'B',
  },
  {
    id: 22,
    letter: 'V',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text:
      'Câu 22: Quân lệnh số 1 phát lệnh Tổng khởi nghĩa trên cả nước vào thời điểm nào?',
    choices: [
      { label: 'A', text: '13/8/1945 (23 giờ).' },
      { label: 'B', text: '14/8/1945' },
      { label: 'C', text: '16/8/1945' },
      { label: 'D', text: '19/8/1945' },
    ],
    correctLabel: 'A',
  },
  {
    id: 23,
    letter: 'W',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text: 'Câu 23: Đại hội Quốc dân tại Tân Trào diễn ra vào ngày nào?',
    choices: [
      { label: 'A', text: '14 - 15/8/1945' },
      { label: 'B', text: '16/8/1945' },
      { label: 'C', text: '19/8/1945' },
      { label: 'D', text: '2/9/1945' },
    ],
    correctLabel: 'B',
  },
  {
    id: 24,
    letter: 'X',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text: 'Câu 24: Mục đích của Cách mạng Tháng Tám 1945 là gì?',
    choices: [
      { label: 'A', text: 'Đánh đổ phát xít Nhật.' },
      {
        label: 'B',
        text:
          'Làm cho dân tộc Việt Nam thoát khỏi ách đế quốc, thành một nước độc lập, tự do.',
      },
      { label: 'C', text: 'Thành lập Mặt trận dân tộc thống nhất.' },
      { label: 'D', text: 'Hoàn thành cách mạng ruộng đất.' },
    ],
    correctLabel: 'B',
  },
  {
    id: 25,
    letter: 'Y',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text: 'Câu 25: Cách mạng Tháng Tám năm 1945 mang tính chất gì?',
    choices: [
      { label: 'A', text: 'Cách mạng vô sản.' },
      { label: 'B', text: 'Cách mạng tư sản kiểu mới.' },
      {
        label: 'C',
        text: 'Cách mạng giải phóng dân tộc mang tính chất dân chủ mới.',
      },
      { label: 'D', text: 'Cách mạng xã hội chủ nghĩa.' },
    ],
    correctLabel: 'C',
  },
  {
    id: 26,
    letter: 'Z',
    category: '5. Cách mạng Tháng Tám (8/1945)',
    text:
      'Câu 26: Thắng lợi của Cách mạng Tháng Tám và việc thành lập nước Việt Nam Dân chủ Cộng hòa có ý nghĩa quốc tế sâu sắc như thế nào?',
    choices: [
      {
        label: 'A',
        text: 'Đặt nền móng cho sự tan rã hệ thống thuộc địa trên thế giới.',
      },
      { label: 'B', text: 'Thể hiện sự lớn mạnh của phong trào Cộng sản quốc tế.' },
      { label: 'C', text: 'Buộc Mỹ phải cam kết không can thiệp vào Đông Dương.' },
      { label: 'D', text: 'Mở ra kỷ nguyên xây dựng chủ nghĩa xã hội.' },
    ],
    correctLabel: 'A',
  },
];

export function initializeQuestions(): Question[] {
  // Try to restore randomized points and used state from localStorage
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('olympia_questions_v1');
      if (saved) {
        const parsed: Question[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 26) {
          return parsed;
        }
      }
    }
  } catch {}

  const withPoints: Question[] = baseQuestions.map((q) => ({
    ...q,
    points: Math.floor(Math.random() * 5) + 1, // 1..5
    used: false,
  }));
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('olympia_questions_v1', JSON.stringify(withPoints));
    }
  } catch {}
  return withPoints;
}

export function saveQuestions(questions: Question[]) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('olympia_questions_v1', JSON.stringify(questions));
    }
  } catch {}
}


