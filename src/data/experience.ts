export type ExperienceItem = {
  period: string;
  title: string;
  sub: string;
  org: string;
  body: string;
  tags: string[];
};

export const experienceItems: ExperienceItem[] = [
  {
    period: "May 2026 - Aug 2026",
    title: "React.js Developer Trainee",
    sub: "PayRupe Payment Platform",
    org: "RupeNet",
    body: "Worked on PayRupe, a digital payment platform, contributing to responsive user interfaces and application features using React.js, HTML, CSS, Bootstrap, and Node.js. Developed and enhanced frontend components for user registration, authentication, and payment-related workflows.",
    tags: ["React.js", "HTML", "CSS", "Bootstrap", "Node.js"],
  },
  {
    period: "Oct 2025 - Jan 2026",
    title: "Full Stack Developer Trainee",
    sub: "Web Application Development",
    org: "Voyage Software Technologies",
    body: "Worked on MyFullNote, a web-based healthcare management application designed to manage patient-related information and streamline healthcare workflows. Contributed to developing and improving the application using HTML, CSS, JavaScript, PHP, and MySQL.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    period: "Apr 2025 - Aug 2025",
    title: "Java Full Stack Developer Intern",
    sub: "Full Stack Web Application Development",
    org: "RR IT Solutions",
    body: "Worked on full-stack web application development using Java, building responsive frontend interfaces, developing backend functionality, integrating MySQL databases, and implementing application features using modern web technologies.",
    tags: ["Core Java", "JavaScript", "Reactjs", "HTML", "CSS", "MySQL"],
  },
  {
    period: "Sep 2024 - Feb 2025",
    title: "Java Full Stack Development Training",
    sub: "Professional Training",
    org: "Besant Technologies",
    body: "Completed comprehensive Java Full Stack Development training covering Core Java, frontend development, backend development, database management, and full-stack web application development through practical projects.",
    tags: ["Core Java", "HTML", "CSS", "JavaScript", "MySQL"],
  },
];

export const HOME_EXPERIENCE_PREVIEW_COUNT = 3;
