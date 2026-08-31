import React from "react";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiBootstrap,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiOpenjdk,
} from "react-icons/si";

// ============================================================
// TECHNOLOGY ICONS
// ============================================================

const HtmlIcon = SiHtml5;
const CssIcon = SiCss;
const JsIcon = SiJavascript;
const ReactIcon = SiReact;
const TsIcon = SiTypescript;
const BootstrapIcon = SiBootstrap;
const TailwindIcon = SiTailwindcss;

const NodeIcon = SiNodedotjs;
const ExpressIcon = SiExpress;

const MySqlIcon = SiMysql;
const PostgreSqlIcon = SiPostgresql;
const MongoIcon = SiMongodb;

const JavaIcon = SiOpenjdk;

// ============================================================
// MERN STACK
// ============================================================

export const MERN_STACK = {
  title: "MERN Stack",

  subtitle: "MongoDB · Express.js · React.js · Node.js",

  skills: [
    {
      name: "MongoDB",
      level: 76,
      color: "from-cyan-500 to-cyan-400",
      icon: MongoIcon,
    },

    {
      name: "Express.js",
      level: 80,
      color: "from-cyan-500 to-cyan-400",
      icon: ExpressIcon,
    },

    {
      name: "React.js",
      level: 88,
      color: "from-cyan-500 to-cyan-400",
      icon: ReactIcon,
    },

    {
      name: "Node.js",
      level: 78,
      color: "from-cyan-500 to-cyan-400",
      icon: NodeIcon,
    },
  ],
} as const;

// ============================================================
// SKILL CATEGORIES
// ============================================================

export const skillCategories = [
  // ==========================================================
  // FRONTEND
  // ==========================================================

  {
    title: "FRONTEND",

    skills: [
      {
        name: "HTML5",
        icon: HtmlIcon,
      },

      {
        name: "CSS3",
        icon: CssIcon,
      },

      {
        name: "JavaScript",
        icon: JsIcon,
      },

      {
        name: "React.js",
        icon: ReactIcon,
      },

      {
        name: "TypeScript",
        icon: TsIcon,
      },

      {
        name: "Bootstrap",
        icon: BootstrapIcon,
      },

      {
        name: "Tailwind CSS",
        icon: TailwindIcon,
      },
    ],
  },

  // ==========================================================
  // BACKEND
  // ==========================================================

  {
    title: "BACKEND",

    skills: [
      {
        name: "Node.js",
        icon: NodeIcon,
      },

      {
        name: "Express.js",
        icon: ExpressIcon,
      },
    ],
  },

  // ==========================================================
  // DATABASE
  // ==========================================================

  {
    title: "DATABASE",

    skills: [
      {
        name: "MySQL",
        icon: MySqlIcon,
      },

      {
        name: "SQL",
        icon: MySqlIcon,
      },

      {
        name: "PostgreSQL",
        icon: PostgreSqlIcon,
      },
    ],
  },

  // ==========================================================
  // PROGRAMMING
  // ==========================================================

  {
    title: "PROGRAMMING",

    skills: [
      {
        name: "Core Java",
        icon: JavaIcon,
      },
    ],
  },
] as const;

// ============================================================
// ADDITIONAL SKILL BARS
// ============================================================

export const additionalSkillBars = [
  {
    name: "Tailwind CSS",
    level: 94,
    color: "from-cyan-500 to-cyan-400",
    icon: TailwindIcon,
  },

  {
    name: "TypeScript",
    level: 88,
    color: "from-cyan-500 to-cyan-400",
    icon: TsIcon,
  },

  {
    name: "Framer Motion",
    level: 86,
    color: "from-cyan-500 to-cyan-400",
    icon: ReactIcon,
  },

  {
    name: "UI / UX Design",
    level: 84,
    color: "from-cyan-500 to-cyan-400",
    icon: CssIcon,
  },
] as const;

// ============================================================
// FULL PAGE SKILLS
// ============================================================

export const fullPageSkills = [
  // ==========================================================
  // MERN STACK
  // ==========================================================

  ...MERN_STACK.skills.map((s) => ({
    name: s.name,

    level: s.level,

    category: "MERN Stack" as const,

    icon: s.icon,

    detail:
      s.name === "MongoDB"
        ? "NoSQL document storage — schemas, queries, and MERN stack integration."
        : s.name === "Express.js"
        ? "REST APIs, routing, middleware, and backend services with Node.js."
        : s.name === "React.js"
        ? "Component architecture, hooks, state management, and interactive UIs."
        : "Server-side JavaScript, APIs, and full-stack application logic.",
  })),

  // ==========================================================
  // FRONTEND
  // ==========================================================

  {
    name: "HTML5 & CSS3",

    level: 90,

    category: "Frontend" as const,

    icon: HtmlIcon,

    detail:
      "Semantic markup, responsive layouts, Flexbox, Grid, animations, and modern CSS patterns.",
  },

  {
    name: "JavaScript",

    level: 88,

    category: "Frontend" as const,

    icon: JsIcon,

    detail:
      "ES6+, async patterns, DOM APIs, events, promises, and client-side application logic.",
  },

  {
    name: "Bootstrap",

    level: 82,

    category: "Frontend" as const,

    icon: BootstrapIcon,

    detail:
      "Responsive grid systems, components, utilities, and rapid UI development.",
  },

  {
    name: "Tailwind CSS",

    level: 94,

    category: "Frontend" as const,

    icon: TailwindIcon,

    detail:
      "Utility-first CSS, responsive design, custom layouts, animations, and modern UI development.",
  },

  {
    name: "TypeScript",

    level: 88,

    category: "Frontend" as const,

    icon: TsIcon,

    detail:
      "Type-safe JavaScript, interfaces, types, generics, and scalable application development.",
  },

  {
    name: "React.js",

    level: 88,

    category: "Frontend" as const,

    icon: ReactIcon,

    detail:
      "Component architecture, hooks, state management, reusable components, and interactive user interfaces.",
  },

  // ==========================================================
  // BACKEND
  // ==========================================================

  {
    name: "Node.js",

    level: 78,

    category: "Backend" as const,

    icon: NodeIcon,

    detail:
      "Server-side JavaScript, REST APIs, asynchronous programming, and backend application logic.",
  },

  {
    name: "Express.js",

    level: 80,

    category: "Backend" as const,

    icon: ExpressIcon,

    detail:
      "REST APIs, routing, middleware, authentication, and backend services with Node.js.",
  },

  // ==========================================================
  // DATABASE
  // ==========================================================

  {
    name: "MongoDB",

    level: 76,

    category: "Database" as const,

    icon: MongoIcon,

    detail:
      "NoSQL document database, collections, documents, queries, schemas, and MERN integration.",
  },

  {
    name: "MySQL",

    level: 80,

    category: "Database" as const,

    icon: MySqlIcon,

    detail:
      "Relational database design, tables, queries, joins, relationships, and data modeling.",
  },

  {
    name: "SQL",

    level: 84,

    category: "Database" as const,

    icon: MySqlIcon,

    detail:
      "Query writing, filtering, sorting, aggregation, joins, and relational data access.",
  },

  {
    name: "PostgreSQL",

    level: 78,

    category: "Database" as const,

    icon: PostgreSqlIcon,

    detail:
      "Advanced SQL, relational design, queries, relationships, and production-grade data storage.",
  },

  // ==========================================================
  // PROGRAMMING
  // ==========================================================

  {
    name: "Core Java",

    level: 76,

    category: "Programming" as const,

    icon: JavaIcon,

    detail:
      "Object-oriented programming, classes, objects, inheritance, polymorphism, collections, and core Java concepts.",
  },
] as const;

// ============================================================
// ORBIT ICONS
// ============================================================
// These are used around the MERN Stack card.
// Actual technology icons are used instead of custom SVG.
// ============================================================

export const orbitIcons = [
  {
    icon: ReactIcon,
    label: "React.js",
  },

  {
    icon: NodeIcon,
    label: "Node.js",
  },

  {
    icon: ExpressIcon,
    label: "Express.js",
  },

  {
    icon: MongoIcon,
    label: "MongoDB",
  },

  {
    icon: HtmlIcon,
    label: "HTML5",
  },

  {
    icon: CssIcon,
    label: "CSS3",
  },

  {
    icon: JsIcon,
    label: "JavaScript",
  },

  {
    icon: TsIcon,
    label: "TypeScript",
  },
] as const;

// ============================================================
// CATEGORY ICONS
// ============================================================

export const categoryIcons = {
  FRONTEND: ReactIcon,
  BACKEND: NodeIcon,
  DATABASE: MongoIcon,
  PROGRAMMING: JavaIcon,
} as const;

// ============================================================
// DEFAULT ICON PROPERTIES
// ============================================================

export const skillIconProps = {
  size: 18,
  strokeWidth: 2,
};

// ============================================================
// ICON CLASS
// ============================================================

export const skillIconClass =
  "w-[18px] h-[18px] text-cyan-400 shrink-0";