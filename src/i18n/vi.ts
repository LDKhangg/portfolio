import type { Dict } from "./en";

export const vi: Dict = {
  nav: { work: "Dự án", about: "Giới thiệu", skills: "Kỹ năng", experience: "Kinh nghiệm", contact: "Liên hệ", langToggle: "Đổi ngôn ngữ" },
  hero: {
    greeting: "Đang ở TP.HCM",
    name: "Lê Duy Khang",
    tagline: "Tôi thích học bằng cách làm, giữ sự tò mò, và để mỗi dự án rõ ràng hơn lúc bắt đầu.",
    facts: ["TP.HCM", "WALA-ICT", "Java là chính, học Go"],
    ctaWork: "Xem dự án",
    ctaCv: "Tải CV",
    console: {
      title: "hồ sơ chạy",
      version: "v1.0",
      command: "./khang",
      rows: [
        { label: "tên", value: "Lê Duy Khang" },
        { label: "địa điểm", value: "TP. Hồ Chí Minh" },
        { label: "hiện tại", value: "WALA-ICT" },
        { label: "đang học", value: "Go trước, rồi thêm ngôn ngữ mới nữa" },
        { label: "trạng thái", value: "đang xây dựng và học hỏi" },
      ],
    },
  },
  about: {
    title: "Giới thiệu",
    description: "Bản tóm tắt ngắn gọn về việc tôi làm, điều tôi quan tâm và nơi tôi đang ở hiện tại.",
    body: [
      "Tôi là lập trình viên fullstack ở TP.HCM, đang xây dựng nền tảng B2B tại WALA-ICT và hoàn thành ngành Kỹ thuật phần mềm tại Đại học FPT.",
      "Backend là thế mạnh của tôi — Spring Boot, REST API, JPA/MyBatis, Redis, RabbitMQ và microservices. Frontend tôi làm React + TypeScript và ưu tiên giao diện rõ ràng trong môi trường vận hành.",
      "Ngoài giờ làm, tôi còn đang cố biến mình thành một con người full-keyboard trên CachyOS. Ý tưởng thì rất thanh lịch, còn số lần tay vẫn vô thức chụp con chuột thì bớt thanh lịch hơn nhiều.",
    ],
    facts: [
      { label: "Địa điểm", value: "TP.HCM" },
      { label: "Hiện tại", value: "WALA-ICT" },
      { label: "Tập trung", value: "Spring Boot, React, TypeScript" },
      { label: "Hiện học", value: "Java là chính, đang học Go" },
    ],
  },
  activity: {
    title: "Hoạt động code",
    description: "Góc nhìn nhanh về tiến độ LeetCode và repo vừa được cập nhật gần nhất.",
    refreshed: "Cập nhật từ dữ liệu GitHub công khai",
    loadingLabel: "Đang tải",
    progressLabel: "Tiến độ",
    solvedLabel: "Đã giải",
    easyLabel: "Dễ",
    mediumLabel: "Trung bình",
    hardLabel: "Khó",
    progressNote: "Được tính từ cấu trúc repository thật bên trong repo leetcode.",
    contributionLabel: "Bảng contribution",
    contributionNote: "Toàn cảnh contribution trong một năm gần đây lấy từ hồ sơ GitHub công khai.",
    contributionAlt: "Biểu đồ contribution GitHub của LDKhangg",
    contributionAction: "Xem trên GitHub",
    latestLabel: "Cập nhật mới nhất",
    latestNote: "Commit mới nhất giữa các repo tôi đang cập nhật thường xuyên nhất lúc này.",
    repositoryLabel: "Repository",
    updatedLabel: "Cập nhật",
    unavailableLabel: "Chưa có dữ liệu",
    latestAction: "Mở commit",
  },
  projects: {
    title: "Dự án nổi bật",
    description: "Ba dự án, ba kiểu công việc khác nhau: IoT, mua sắm và hệ thống quản trị nội bộ.",
    openProject: "Mở dự án",
    stackLabel: "Stack",
    items: [
      {
        name: "Locker R — Nền tảng tủ khóa thông minh IoT",
        role: "Đồ án tốt nghiệp · Toàn stack",
        description:
          "Backend phân tán 11 microservices Spring Boot sau Spring Cloud Gateway — event RabbitMQ, phần cứng tủ qua MQTT, theo dõi real-time bằng WebSocket/STOMP, RBAC bằng JWT. CI/CD lên DigitalOcean.",
        stack: ["Java 21", "Spring Cloud", "RabbitMQ", "MQTT", "PostgreSQL", "Docker"],
        link: "https://github.com/LDKhangg/Locker-EXE-Graduation",
      },
      {
        name: "Sàn mua sắm B2B ngành xây dựng",
        role: "WALA-ICT · Phát triển backend",
        description:
          "Nền tảng e-procurement đa tenant — yêu cầu báo giá, đấu thầu, hợp đồng, khiếu nại, hóa đơn. Kiến trúc Hexagonal, RBAC theo tenant, tầng bảo mật dùng Redis kèm rate limiting phân tán.",
        stack: ["Java 21", "Spring Boot", "MyBatis", "PostgreSQL", "Redis", "GitLab CI"],
        link: null,
      },
      {
        name: "SaaS quản lý chuỗi phòng tập",
        role: "WALA-ICT · Phát triển toàn stack",
        description:
          "SaaS cho chuỗi phòng tập toàn quốc — hội viên, bán vé, chiến dịch coupon, quyết toán doanh thu. Các service Spring Boot chia theo bounded context cùng trang quản trị React 19.",
        stack: ["Spring Boot 3", "QueryDSL", "MySQL", "Redis", "React 19", "TypeScript"],
        link: null,
      },
    ],
  },
  skills: {
    title: "Stack",
    description: "Bản nhìn gọn về những phần tôi dùng nhiều nhất ở backend, frontend, data, cloud và phần Go tôi đang học thêm.",
    groups: [
      { label: "Backend", items: "Java · Spring Boot · Go · Spring Security · JPA/Hibernate · MyBatis · QueryDSL · REST" },
      { label: "Frontend", items: "React · TypeScript · Zustand · TanStack Query · styled-components · Tailwind" },
      { label: "Data & Messaging", items: "PostgreSQL · MySQL · Redis · RabbitMQ · MQTT · WebSocket/STOMP" },
      { label: "DevOps & Cloud", items: "Docker · GitHub Actions · GitLab CI · AWS (EC2, S3, RDS, IAM)" },
    ],
  },
  experience: {
    title: "Kinh nghiệm",
    description: "Dòng thời gian ngắn về công việc có lương và đào tạo cloud.",
    items: [
      { org: "WALA-ICT", role: "Lập trình viên Fullstack", time: "Jun 2025 — nay", note: "Xây dựng tính năng ERP và hệ thống business đa tenant bằng React và Java/Spring Boot, làm việc cùng BA và developer theo Scrum, tích hợp API, hỗ trợ kiểm thử và phát hành." },
      { org: "AWS First Cloud Journey", role: "Chương trình đào tạo Cloud", time: "Sep — Nov 2025", note: "Thực hành AWS với EC2, S3, RDS và IAM trong chương trình đào tạo đám mây." },
    ],
  },
  certs: {
    title: "Học tập và chứng chỉ",
    description: "Học vấn và các chương trình gần đây hỗ trợ cho công việc ở trên.",
    items: [
      { name: "Đại học FPT — Kỹ thuật phần mềm", detail: "2022 — 2026" },
      { name: "AWS First Cloud Journey", detail: "Hoàn thành chương trình thực hành đám mây, 2025" },
      { name: "Tiếng Anh — CEFR B2", detail: "EnglishScore, ≈785 TOEIC" },
    ],
  },
  contact: {
    title: "Liên hệ",
    blurb: "Nếu muốn trao đổi về backend, frontend hoặc công việc sản phẩm, hãy gửi email cho tôi.",
    email: "contact.ldkhang@gmail.com",
    footer: "Xây bằng React · Triển khai trên GitHub Pages",
    description: "Cách nhanh nhất để liên hệ với tôi là email.",
    statsAlt: "Thống kê GitHub",
    langsAlt: "Ngôn ngữ dùng nhiều nhất",
  },
};
