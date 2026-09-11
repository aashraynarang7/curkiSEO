// Site-wide copy and settings. Source of truth: curki-audience-deep-dive.md.
// Never hard-code this copy in components.

export const site = {
  name: "Curki AI",
  // TODO: confirm canonical production domain before launch.
  url: "https://curki.ai",
  locale: "en_AU",
  language: "en-AU",
  location: "Sydney, Australia",
  oneLiner: "Turn operational chaos into clarity in minutes.",
  description:
    "Purpose-built AI Associates for Australian workforce-driven, compliance-focused organisations. They sit on top of your existing systems: no system changes, no IT overhaul.",
  // TODO: replace with the real walkthrough booking link (e.g. a calendar URL).
  // Every page has a #book-a-walkthrough section, so this anchor works site-wide until then.
  bookingUrl: "#book-a-walkthrough",
  bookingLabel: "Book a walkthrough",
  // TODO: add organisation contact email, ABN, street address and social profile URLs for JSON-LD.
  contactEmail: "",
  sameAs: [] as string[],
} as const;

export type Stat = { value: string; label: string };

export const proofStats: Stat[] = [
  { value: "$60k+", label: "annual saving" },
  { value: "<5 weeks", label: "payback" },
  { value: "3–5%", label: "margin uplift" },
  { value: "<1 hour", label: "from signup to a running AI Associate" },
];

export type IndustryId =
  | "aged-care-ndis"
  | "healthcare-allied-health"
  | "field-services"
  | "transport-postal-warehousing"
  | "hospitality-venues";

export const industries: { id: IndustryId; name: string }[] = [
  { id: "aged-care-ndis", name: "Aged Care & NDIS" },
  { id: "healthcare-allied-health", name: "Healthcare & Allied Health" },
  { id: "field-services", name: "Field Services & Mobile Workforces" },
  { id: "transport-postal-warehousing", name: "Transport, Postal & Warehousing" },
  { id: "hospitality-venues", name: "Hospitality & Venues" },
];

export type Persona = {
  id: string;
  title: string;
  concern: string;
  pains: string[];
  associates: string[]; // associate slugs
};

// The four buyer profiles from the audience research.
export const personas: Persona[] = [
  {
    id: "ceo-owner",
    title: "CEOs & Owners",
    concern: "Staying profitable and compliant while the business grows.",
    pains: [
      "Know there are leaks, but not where they are or how to fix them",
      "Can't justify a full-time CFO or an internal compliance hire",
      "Worried the data in your systems isn't accurate or audit-ready",
    ],
    associates: ["oliver-finance", "james-compliance"],
  },
  {
    id: "finance-manager",
    title: "Finance Managers & CFOs",
    concern: "A single source of truth without days in spreadsheets.",
    pains: [
      "Every question from the owner means exporting from several systems",
      "Manual pivot tables to find margins, leaks and wage-to-revenue",
      "Profitability known weeks after the month closes",
    ],
    associates: ["oliver-finance"],
  },
  {
    id: "operations-manager",
    title: "Operations Managers",
    concern: "Delivering every service with the right staff, without the admin.",
    pains: [
      "Hours spent rostering and finding last-minute replacements",
      "Finding, onboarding, training and checking documents for new staff",
      "Zero visibility of the cost of rostering decisions",
    ],
    associates: ["will-rostering", "alex-hr-onboarding", "zoe-documentation"],
  },
  {
    id: "compliance-manager",
    title: "Quality & Compliance Managers",
    concern: "Always audit-ready, without checking every record by hand.",
    pains: [
      "Days spent sampling notes to find incident and documentation gaps",
      "Standards keep changing and every process needs revisiting",
      "Incidents missed until a family complains or an audit finds them",
    ],
    associates: ["james-compliance"],
  },
];

export type ProblemPillar = {
  id: string;
  title: string;
  statement: string;
  detail: string;
  associates: string[];
};

export const problemPillars: ProblemPillar[] = [
  {
    id: "financial-leaks",
    title: "Financial leaks",
    statement: "Revenue hides mistakes.",
    detail:
      "Delivered supports that never became invoices, unspent funds that expire, and penalty rates quietly eroding margin. Most providers only find out when the cash is already gone.",
    associates: ["oliver-finance", "will-rostering"],
  },
  {
    id: "compliance-gaps",
    title: "Compliance gaps",
    statement: "Sampling 5–10% of records leaves the rest unchecked.",
    detail:
      "A fall mentioned in a shift note with no incident record. An incident with no follow-up date. Gaps like these surface during audits, not before.",
    associates: ["james-compliance"],
  },
  {
    id: "time-wastage",
    title: "Lost time",
    statement: "Your team's hours go to admin, not care.",
    detail:
      "Typing notes at the end of a shift, phone tag at 7am to fill a sick call, and weeks chasing documents from new starters.",
    associates: ["zoe-documentation", "will-rostering", "alex-hr-onboarding"],
  },
];

export const connectSteps: { title: string; detail: string }[] = [
  {
    title: "Create your account",
    detail: "Sign up at Curki.ai and verify your email.",
  },
  {
    title: "Connect your systems",
    detail:
      "Open Connect, paste an API key or complete the OAuth authorisation for care management, rostering, finance, payroll or HR.",
  },
  {
    title: "Confirm access",
    detail: "Choose the data scopes you share. Read-only is recommended, and you can revoke access at any time.",
  },
  {
    title: "Put an Associate to work",
    detail: "Pick an Associate from the module menu and start asking questions or running workflows.",
  },
];

export type SecurityIcon = "map-pin" | "lock" | "key" | "eye-off" | "user-check" | "unplug";

export const securityPoints: { icon: SecurityIcon; title: string; detail: string }[] = [
  {
    icon: "map-pin",
    title: "Hosted in Australia",
    detail: "Data is hosted on Microsoft Azure Australia, an ISO 27001 compliant environment.",
  },
  { icon: "lock", title: "Encrypted", detail: "AES-256 at rest and TLS in transit." },
  {
    icon: "key",
    title: "You control access",
    detail: "Role-based access control, 2FA and SSO support, with least-privilege, read-only scopes by default.",
  },
  {
    icon: "eye-off",
    title: "Not used for training",
    detail: "Your data is never sold and is not used to train public AI models.",
  },
  {
    icon: "user-check",
    title: "Humans stay in charge",
    detail: "Associates recommend, draft and flag. Your people review and approve.",
  },
  {
    icon: "unplug",
    title: "Revocable any time",
    detail: "Revoke API access from Curki.ai or from your source system whenever you choose.",
  },
];

export type Faq = { question: string; answer: string };

export const homeFaqs: Faq[] = [
  {
    question: "Do we need to replace or change our existing software?",
    answer:
      "No. AI Associates connect to your existing care management, rostering, finance, payroll and HR systems via API and work on top of them. There are no system changes and no IT overhaul.",
  },
  {
    question: "Do we need our IT team involved?",
    answer:
      "Usually not. If you can access a system's API key or authorise the connection, you can connect it yourself in minutes.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Typically about 3 minutes per system once your credentials are ready, and under an hour from signup to a running AI Associate.",
  },
  {
    question: "Which systems can you connect to?",
    answer:
      "Common Australian care management, rostering, finance, payroll, HR and incident systems. Tell us what you use and we'll confirm which connectors are live today.",
  },
  {
    question: "Can AI Associates change data in our systems?",
    answer:
      "Connections are read-only by default, so you make corrections in your source systems. Where write-back is supported, such as approved notes from Zoe AI, it is only enabled with your explicit approval.",
  },
  {
    question: "Where is our data hosted, and is it used to train AI models?",
    answer:
      "Your data is hosted on Microsoft Azure Australia, encrypted at rest and in transit, and protected by role-based access, 2FA and SSO. It is not used to train public AI models.",
  },
  {
    question: "Will AI Associates replace our staff?",
    answer:
      "No. They remove repetitive work like reconciliations, note typing and phone tag, so your team can focus on decisions and care. People approve every important step.",
  },
  {
    question: "Can we start with one team or site?",
    answer:
      "Yes. Many providers start with one team, region or house, prove the workflow, then expand.",
  },
];

// ---------- Page copy ----------

export const homeCopy = {
  seo: {
    title: "AI Associates for Care & Workforce Providers | Curki AI",
    description:
      "AI Associates that find margin leaks, fill shifts, draft notes, onboard staff and audit incidents, on top of your existing systems. Built in Sydney.",
  },
  hero: {
    eyebrow: "AI Associates · Built in Sydney",
    titleLead: "AI Associates that turn operational chaos into",
    titleAccent: "clarity in minutes",
    intro:
      "Purpose-built AI Associates for Australian workforce-driven, compliance-focused organisations. They sit on top of the systems you already use, with no system changes and no IT overhaul.",
    secondaryCta: { label: "Meet the AI Associates", href: "#associates" },
    assurances: ["Hosted on Microsoft Azure Australia", "Read-only by default", "People approve every step"],
  },
  associates: {
    eyebrow: "Your AI Associates",
    title: "Five specialists that work on top of your existing systems",
    intro:
      "Each AI Associate is purpose-built for one part of your operation: finance and payroll, documentation, hiring and onboarding, rostering, and incident compliance.",
  },
  problems: {
    eyebrow: "The problems we solve",
    title: "The leaks, gaps and lost hours a spreadsheet can't show you",
    intro:
      "Most providers know something is wrong. They just can't see where it is, how big it has become or how to fix it.",
    quote: "Your mission is care. Our mission is clarity.",
  },
  how: {
    eyebrow: "How it works",
    title: "No system changes. No IT overhaul.",
    intro:
      "AI Associates connect via API to the systems that already hold your truth. Most teams connect a system in about 3 minutes once credentials are ready.",
    systemsTitle: "Connect what you already use",
    systemsNote: "API-first",
    systems: ["Care management & rostering", "Finance", "Payroll", "HR", "Incident & risk register"],
    layerNote:
      "AI Associates work as an insights and automation layer on top. Your source systems stay the system of record.",
    securityTitle: "Security built for sensitive participant and staff data",
  },
  who: {
    eyebrow: "Who it's for",
    title: "Built for the people accountable for margin, compliance and care",
    intro:
      "For Australian workforce-driven, compliance-focused organisations, typically with 20 or more participants or staff.",
    industriesTitle: "Industries we serve",
    industriesNote:
      "Every AI Associate is built for Aged Care & NDIS providers. Hiring and onboarding with Alex AI extends across all five industries.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
  },
};

export const associatesIndexCopy = {
  seo: {
    title: "AI Associates: Finance, Rostering, HR & More | Curki AI",
    description:
      "Meet Oliver, Zoe, Alex, Will and James: AI Associates for finance, documentation, hiring, rostering and incident compliance in Australia.",
  },
  eyebrow: "AI Associates",
  title: "AI Associates for finance, documentation, HR, rostering and compliance",
  intro:
    "Five purpose-built specialists that sit on top of your existing systems. Start with the one that solves your most pressing problem, then add more.",
};

export const cta = {
  eyebrow: "Book a walkthrough",
  title: "See your AI Associates working with your systems",
  body: "In a 30-minute session, our product experts will look at your stack, confirm which connectors are live and walk you through the workflow end to end. Onboarding support is complimentary.",
  points: ["No system changes", "Read-only by default", "Data hosted in Australia", "People approve every step"],
};

// Illustrative hero panel, based on Oliver's "overtime trap" use case in the source file.
export const heroDemo = {
  associateSlug: "oliver-finance",
  assistant: "Ask Oliver",
  caption: "Illustrative example of Ask Oliver answering a question about penalty rates, with its sources.",
  connected: ["Rostering", "Finance", "Payroll"],
  question: "Which shifts are driving the most penalty rates?",
  answer: "3 clients are consistently serviced on penalty rates, eroding margin to near zero.",
  findings: [
    { label: "Client A", detail: "Penalty windows, senior staff assigned", status: "risk" },
    { label: "Client B", detail: "Weekend and public holiday rates", status: "risk" },
    { label: "Client C", detail: "Recurring overtime pattern", status: "watch" },
  ] as { label: string; detail: string; status: "risk" | "watch" }[],
  sources: ["Rostering · shift records", "Payroll · pay lines"],
  action: "Adjust roster mix and coverage to restore profitability.",
  label: "Illustrative example",
  chips: [
    { associate: "will-rostering", text: "First valid YES received. Confirm the shift?" },
    { associate: "james-compliance", text: "Possible unreported incident flagged for review." },
  ],
};
