// ─── Types ────────────────────────────────────────────────────────────────────

export type Role = "user" | "recruteur" | "entreprise";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
};

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  skills: string[];
  description: string;
};

export type CandidateStatus = "pending" | "accepted" | "refused";

export type Candidate = {
  id: string;
  name: string;
  role: string;
  experience: string;
  initials: string;
  status: CandidateStatus;
};

// ─── Mock Jobs ────────────────────────────────────────────────────────────────

export const jobs: Job[] = [
  {
    id: "1",
    company: "Vermeg",
    title: "Développeur React Native",
    location: "Tunis, Tunisie",
    type: "CDI",
    salary: "2500 TND",
    skills: ["React Native", "TypeScript", "Redux"],
    description:
      "Rejoignez notre équipe mobile pour développer des apps bancaires.",
  },
  {
    id: "2",
    company: "Telnet",
    title: "Ingénieur DevOps",
    location: "Sousse, Tunisie",
    type: "CDI",
    salary: "3000 TND",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    description: "Automatisez et optimisez nos pipelines de déploiement.",
  },
  {
    id: "3",
    company: "Sofrecom",
    title: "Développeur Full Stack",
    location: "Tunis, Tunisie",
    type: "CDD",
    salary: "2200 TND",
    skills: ["Node.js", "React", "PostgreSQL"],
    description:
      "Développez des solutions télécoms pour nos clients internationaux.",
  },
  {
    id: "4",
    company: "Proxym",
    title: "Data Scientist",
    location: "Sfax, Tunisie",
    type: "CDI",
    salary: "2800 TND",
    skills: ["Python", "TensorFlow", "SQL", "Pandas"],
    description: "Analysez des données massives et construisez des modèles ML.",
  },
  {
    id: "5",
    company: "Talan Tunisia",
    title: "Développeur Java",
    location: "Tunis, Tunisie",
    type: "CDI",
    salary: "2400 TND",
    skills: ["Java", "Spring Boot", "Microservices"],
    description: "Développez des APIs robustes pour le secteur financier.",
  },
  {
    id: "6",
    company: "Wevioo",
    title: "UI/UX Designer",
    location: "Tunis, Tunisie",
    type: "Freelance",
    salary: "1800 TND",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    description: "Créez des interfaces élégantes pour nos projets digitaux.",
  },
  {
    id: "7",
    company: "OneStock",
    title: "Développeur Angular",
    location: "Monastir, Tunisie",
    type: "CDI",
    salary: "2100 TND",
    skills: ["Angular", "TypeScript", "RxJS"],
    description:
      "Intégrez des solutions e-commerce pour nos clients européens.",
  },
  {
    id: "8",
    company: "Cynapsys",
    title: "QA Engineer",
    location: "Tunis, Tunisie",
    type: "CDI",
    salary: "1900 TND",
    skills: ["Selenium", "Cypress", "Postman", "Jira"],
    description: "Garantissez la qualité de nos livrables logiciels.",
  },
  {
    id: "9",
    company: "Linedata",
    title: "Développeur .NET",
    location: "Tunis, Tunisie",
    type: "CDI",
    salary: "2600 TND",
    skills: ["C#", ".NET", "Azure", "SQL Server"],
    description: "Développez des solutions de gestion d'actifs financiers.",
  },
  {
    id: "10",
    company: "Esprit Startup",
    title: "Développeur Flutter",
    location: "Ariana, Tunisie",
    type: "Stage",
    salary: "600 TND",
    skills: ["Flutter", "Dart", "Firebase"],
    description: "Participez au développement d'une app mobile innovante.",
  },
];

// ─── Mock Candidates ──────────────────────────────────────────────────────────

export const CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Ahmed Ben Salah",
    role: "Développeur React Native",
    experience: "3 ans d'expérience",
    initials: "AB",
    status: "pending",
  },
  {
    id: "2",
    name: "Sarra Mansouri",
    role: "UI/UX Designer",
    experience: "2 ans d'expérience",
    initials: "SM",
    status: "pending",
  },
  {
    id: "3",
    name: "Mohamed Trabelsi",
    role: "Ingénieur DevOps",
    experience: "5 ans d'expérience",
    initials: "MT",
    status: "pending",
  },
  {
    id: "4",
    name: "Ines Belhaj",
    role: "Data Scientist",
    experience: "4 ans d'expérience",
    initials: "IB",
    status: "pending",
  },
  {
    id: "5",
    name: "Yassine Khelifi",
    role: "Développeur Full Stack",
    experience: "2 ans d'expérience",
    initials: "YK",
    status: "pending",
  },
  {
    id: "6",
    name: "Rim Chaabane",
    role: "QA Engineer",
    experience: "3 ans d'expérience",
    initials: "RC",
    status: "pending",
  },
  {
    id: "7",
    name: "Khalil Ayari",
    role: "Développeur Java",
    experience: "6 ans d'expérience",
    initials: "KA",
    status: "pending",
  },
  {
    id: "8",
    name: "Nour Gharbi",
    role: "Développeur Angular",
    experience: "1 an d'expérience",
    initials: "NG",
    status: "pending",
  },
];
