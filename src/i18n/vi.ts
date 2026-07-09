import type { Dict } from "./en";

export const vi: Dict = {
  nav: { work: "Dự án", about: "Giới thiệu", skills: "Kỹ năng", experience: "Kinh nghiệm", contact: "Liên hệ", langToggle: "Đổi ngôn ngữ" },
  hero: {
    greeting: "Xin chào, tôi là",
    name: "Lê Duy Khang",
    tagline: "Fullstack developer — Java Spring Boot & React. Xây dựng hệ thống production từ đầu đến cuối.",
    ctaWork: "Xem dự án ↓",
    ctaCv: "Tải CV",
  },
  about: {
    title: "Giới thiệu",
    body: [
      "Tôi là fullstack developer tại TP.HCM, đang xây dựng nền tảng B2B ở WALA-ICT và hoàn thành ngành Kỹ thuật phần mềm tại Đại học FPT.",
      "Backend là thế mạnh của tôi — Spring Boot, REST API, JPA/MyBatis, Redis, RabbitMQ, microservices. Frontend tôi làm React + TypeScript. Tôi quan tâm đến hệ thống sống được ở production, không chỉ demo.",
    ],
  },
  projects: {
    title: "Dự án nổi bật",
    items: [
      {
        name: "Locker R — Nền tảng tủ khóa thông minh IoT",
        role: "Đồ án tốt nghiệp · Fullstack",
        description:
          "Backend phân tán 11 microservices Spring Boot sau Spring Cloud Gateway — event RabbitMQ, phần cứng tủ qua MQTT, theo dõi real-time bằng WebSocket/STOMP, RBAC bằng JWT. CI/CD lên DigitalOcean.",
        stack: ["Java 21", "Spring Cloud", "RabbitMQ", "MQTT", "PostgreSQL", "Docker"],
        link: "https://github.com/LDKhangg/Locker-EXE-Graduation",
      },
      {
        name: "Sàn mua sắm B2B ngành xây dựng",
        role: "WALA-ICT · Backend",
        description:
          "Nền tảng e-procurement đa tenant — yêu cầu báo giá, đấu thầu, hợp đồng, khiếu nại, hóa đơn. Kiến trúc Hexagonal, RBAC theo tenant, tầng bảo mật dùng Redis kèm rate limiting phân tán.",
        stack: ["Java 21", "Spring Boot", "MyBatis", "PostgreSQL", "Redis", "GitLab CI"],
        link: null,
      },
      {
        name: "SaaS quản lý chuỗi phòng tập",
        role: "WALA-ICT · Fullstack",
        description:
          "SaaS cho chuỗi phòng tập toàn quốc — hội viên, bán vé, chiến dịch coupon, quyết toán doanh thu. Các service Spring Boot chia theo bounded context cùng trang quản trị React 19.",
        stack: ["Spring Boot 3", "QueryDSL", "MySQL", "Redis", "React 19", "TypeScript"],
        link: null,
      },
    ],
  },
  skills: {
    title: "Kỹ năng",
    groups: [
      { label: "Backend", items: "Java · Spring Boot · Spring Security · JPA/Hibernate · MyBatis · QueryDSL · REST" },
      { label: "Frontend", items: "React · TypeScript · Zustand · TanStack Query · styled-components · Tailwind" },
      { label: "Data & Messaging", items: "PostgreSQL · MySQL · Redis · RabbitMQ · MQTT · WebSocket/STOMP" },
      { label: "DevOps & Cloud", items: "Docker · GitHub Actions · GitLab CI · AWS (EC2, S3, RDS, IAM)" },
    ],
  },
  experience: {
    title: "Kinh nghiệm",
    items: [
      { org: "WALA-ICT", role: "Software Developer", time: "12/2025 — nay", note: "Phát triển fullstack cho hệ thống B2B production — API Spring Boot và giao diện quản trị React/TypeScript, quy trình Agile/Scrum." },
      { org: "AWS First Cloud Journey", role: "Chương trình đào tạo Cloud", time: "9 — 11/2025", note: "Thực hành AWS; xây dựng và triển khai nền tảng đặt thuê xe điện trên EC2, S3, RDS, IAM." },
    ],
  },
  certs: {
    title: "Chứng chỉ & Học vấn",
    items: [
      { name: "Đại học FPT — Kỹ thuật phần mềm", detail: "2022 — 2026" },
      { name: "AWS First Cloud Journey", detail: "Hoàn thành chương trình thực hành cloud, 2025" },
      { name: "Tiếng Anh — CEFR B2", detail: "EnglishScore, ≈785 TOEIC" },
    ],
  },
  contact: {
    title: "Liên hệ",
    blurb: "Sẵn sàng cho cơ hội fullstack / backend. Liên hệ nhé.",
    email: "contact.ldkhang@gmail.com",
    footer: "Xây bằng React · Deploy trên AWS S3",
    statsAlt: "Thống kê GitHub",
    langsAlt: "Ngôn ngữ dùng nhiều nhất",
  },
};
