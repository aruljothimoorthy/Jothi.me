import besantCert from "@/components/assets/besant certificate.pdf";
import cloudCert from "@/components/assets/cloud.pdf";
import dataAnalyticsCert from "@/components/assets/Data Analytics.pdf";
import reactCert from "@/components/assets/frontend_developer_react certificate (1).pdf";
import internCert from "@/components/assets/Inten certificate.pdf";
import internshipLetter from "@/components/assets/Aruljothi_Internship_Letter.pdf";
import jsCert from "@/components/assets/javascript_basic certificate.pdf";
import excelCert from "@/components/assets/Microsoft Excel .pdf";
import officeCert from "@/components/assets/Microsoft Office Fundamental.pdf";

import besantPreview from "@/components/assets/cert-previews/besant.jpg";
import cloudPreview from "@/components/assets/cert-previews/cloud.jpg";
import dataAnalyticsPreview from "@/components/assets/cert-previews/data-analytics.jpg";
import reactPreview from "@/components/assets/cert-previews/react.jpg";
import internPreview from "@/components/assets/cert-previews/intern.jpg";
import internshipLetterPreview from "@/components/assets/cert-previews/internship-letter.jpg";
import jsPreview from "@/components/assets/cert-previews/javascript.jpg";
import excelPreview from "@/components/assets/cert-previews/excel.jpg";
import officePreview from "@/components/assets/cert-previews/office.jpg";

export type Credential = {
  title: string;
  issuer: string;
  date: string;
  tags: string[];
  color: string;
  file: string;
  preview: string;
  description?: string;
};

export const credentials: Credential[] = [
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    date: "2026",
    tags: ["REACT", "FRONTEND", "HACKERRANK"],
    color: "#34d399",
    file: reactCert,
    preview: reactPreview,
    description:
      "HackerRank verified role certificate for Frontend Developer with React — components, hooks, and modern UI development.",
  },
  {
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "2026",
    tags: ["JAVASCRIPT", "FRONTEND", "HACKERRANK"],
    color: "#34d399",
    file: jsCert,
    preview: jsPreview,
    description:
      "HackerRank skill certification for JavaScript fundamentals — syntax, DOM, and core programming concepts.",
  },
  {
    title: "Cloud Computing",
    issuer: "Professional Certification",
    date: "2025",
    tags: ["CLOUD", "COMPUTING"],
    color: "#fb923c",
    file: cloudCert,
    preview: cloudPreview,
    description: "Certificate in cloud computing fundamentals and modern cloud-based application concepts.",
  },
  {
    title: "Data Analytics",
    issuer: "Professional Certification",
    date: "2025",
    tags: ["DATA", "ANALYTICS"],
    color: "#a78bfa",
    file: dataAnalyticsCert,
    preview: dataAnalyticsPreview,
    description:
      "Data analytics certification covering data collection, analysis, visualization, and insight-driven decision making.",
  },
  {
    title: "Microsoft Excel",
    issuer: "Microsoft",
    date: "2025",
    tags: ["EXCEL", "MICROSOFT", "OFFICE"],
    color: "#22c55e",
    file: excelCert,
    preview: excelPreview,
    description:
      "Microsoft Excel certification — spreadsheets, formulas, data organization, and analytical workflows.",
  },
  {
    title: "Microsoft Office Fundamentals",
    issuer: "Microsoft",
    date: "2025",
    tags: ["OFFICE", "MICROSOFT", "PRODUCTIVITY"],
    color: "#22c55e",
    file: officeCert,
    preview: officePreview,
    description:
      "Microsoft Office Fundamentals certificate covering core productivity tools and professional document workflows.",
  },
  {
    title: "Java Full Stack Development",
    issuer: "Besant Technologies",
    date: "Feb 2025",
    tags: ["JAVA", "FULL STACK", "TRAINING"],
    color: "#60a5fa",
    file: besantCert,
    preview: besantPreview,
    description:
      "Completed Java Full Stack Development training covering Core Java, frontend, backend, and database integration.",
  },
  {
    title: "Java Full Stack Developer Intern",
    issuer: "RR IT Solutions",
    date: "Aug 2025",
    tags: ["JAVA", "INTERN", "FULL STACK"],
    color: "#f59e0b",
    file: internCert,
    preview: internPreview,
    description:
      "Internship certificate for full-stack web application development using Java, React, HTML, CSS, and MySQL.",
  },
  {
    title: "React.js Trainee Internship Letter",
    issuer: "RupeNet Technology Solutions",
    date: "Aug 2026",
    tags: ["REACT", "INTERN", "LETTER"],
    color: "#38bdf8",
    file: internshipLetter,
    preview: internshipLetterPreview,
    description:
      "Internship completion letter for React.js Trainee at RupeNet Technology Solutions (PayRupe) — May 2026 to Aug 2026.",
  },
];
