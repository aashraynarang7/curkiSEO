// Every AI Associate is defined here. Pages, cards, metadata, sitemap and JSON-LD
// are all generated from this file. To add an associate, add one entry to `associates`.
// Source of truth: curki-audience-deep-dive.md. Do not add claims that aren't in that file.

import type { StaticImageData } from "next/image";
import type { Faq, IndustryId } from "./site";

import oliverImg from "@/associates/oliver.jpeg";
import zoeImg from "@/associates/zoe.jpeg";
import alexImg from "@/associates/alex.jpeg";
import willImg from "@/associates/will.jpeg";
import jamesImg from "@/associates/james.jpeg";

export type Item = { title: string; detail: string };

export type AssociateIconName = "chart-pie" | "mic" | "user-plus" | "calendar-clock" | "shield-check";

export type Associate = {
  slug: string;
  name: string;
  shortName: string;
  role: string;
  domain: string;
  /** Icon shown on flip cards and badges. */
  icon: AssociateIconName;
  /** Short one-line role used on cards. */
  tagline: string;
  /** H1 on the associate page; includes the name and primary keyword. */
  h1: string;
  summary: string;
  seo: { title: string; description: string; keywords: string[] };
  image: { src: StaticImageData; alt: string };
  /**
   * Role illustration in `public/images/associates/`. `bg` is the artwork's own ground colour,
   * so a wide frame can extend it seamlessly instead of cropping the square.
   */
  art: { name: string; alt: string; bg: string };
  /**
   * Shows the live blue "recording" pulse behind the hero portrait. Only true for the
   * voice-capture associate — on any other role the recording metaphor would be misleading.
   */
  pulse?: boolean;
  /** 2–3 headline outcomes for cards. */
  cardOutcomes: string[];
  problem: { before: string; pains: string[] };
  solution: { after: string };
  outcomes: Item[];
  modules?: Item[];
  capabilities: Item[];
  useCases: Item[];
  /** Illustrative model from Curki's value metrics. */
  valueModel?: { heading: string; rows: { before: string; after: string }[]; footnote: string };
  askPrompts?: string[];
  uncertainty: Item[];
  boundaries: Item[];
  connect: { systems: string[]; configure: string[] };
  fit: { idealFor: string; notIdealFor?: string };
  personas: string[];
  industries: IndustryId[];
  security: string[];
  faqs: Faq[];
  quote: string;
  related: string[];
};

export const associates: Associate[] = [
  {
    slug: "oliver-finance",
    name: "Oliver AI",
    shortName: "Oliver",
    role: "CFO Associate",
    domain: "Finance & Operations",
    icon: "chart-pie",
    tagline: "Your digital CFO. Shows exactly where money is leaking and what to fix.",
    h1: "Oliver AI: AI finance, payroll and client profitability analysis",
    summary:
      "Oliver securely connects your care management, rostering, finance, HR and payroll systems to show exactly where money is leaking, and what to fix, fast. Replace days of spreadsheet reconciliation with near real-time, decision-ready insights that protect and grow margins.",
    seo: {
      title: "Oliver AI: AI Finance & Payroll Analysis | Curki AI",
      description:
        "Find margin leaks, unbilled services and pay-run errors. Oliver AI reconciles rosters, finance and payroll on top of your existing systems.",
      keywords: [
        "AI finance analysis for care providers",
        "NDIS profitability reporting",
        "payroll audit software",
        "client profitability analysis",
        "unbilled services detection",
      ],
    },
    image: {
      src: oliverImg,
      alt: "Portrait of Oliver AI, Curki's CFO Associate for finance and operations",
    },
    art: {
      name: "oliver-margin",
      alt: "Illustration of Oliver AI reconciling revenue, wages and invoices to find margin leaks",
      bg: "#eee2d6",
    },

    cardOutcomes: [
      "Boost margins by up to 15%",
      "Recover $100k–$200k a year in missed invoices and claim leakage",
      "Save 30–40% of admin time on reconciliations",
    ],
    problem: {
      before:
        "Finance teams spend 3–5 days a month exporting CSVs, reconciling payroll to rosters and hunting variances in pivot tables. Profitability is known weeks later, and leaks stay hidden until the cash is already gone.",
      pains: [
        "Delivered supports that never become invoices",
        "Unspent funds discovered after they expire",
        "Penalty rates and overtime quietly eroding margin",
        "Pay-run errors found only after staff complaints or a wage blowout",
      ],
    },
    solution: {
      after:
        "Connect your systems via API in minutes. Oliver reconciles revenue against wages per client and shift, flags unbilled services, highlights expiring funds and gives you a traffic-light profitability check you can act on immediately.",
    },
    outcomes: [
      {
        title: "Boost margins by up to 15%",
        detail: "Identify under-billed services, unoptimised rosters and penalty-rate hotspots.",
      },
      {
        title: "Recover $100k–$200k annually",
        detail: "Surface missed invoices, claim leakage and operational inefficiencies.",
      },
      {
        title: "Save 30–40% of admin time",
        detail: "Cut manual exports, reconciliations and spreadsheet wrangling.",
      },
      {
        title: "Accelerate reporting by 5x",
        detail: "Management-ready profitability and wage-to-revenue views, produced automatically.",
      },
      {
        title: "Catch pay-run errors before approval",
        detail: "Flag differences between rostered, approved and paid hours, including ghost shifts.",
      },
      {
        title: "Audit-ready financial traceability",
        detail: "Every number is linked back to service delivery evidence in your source systems.",
      },
    ],
    modules: [
      {
        title: "Financial Health",
        detail:
          "A company-wide financial health check-up. Reconciles delivered supports against claims and invoices, flags unspent funds and produces board-ready views.",
      },
      {
        title: "Client Profitability",
        detail:
          "The unit economics engine. Shows who you made money on, who you lost money on and why, down to the participant, shift pattern and service line.",
      },
      {
        title: "Payroll Analysis",
        detail:
          "Your payroll auditor. Reconciles timesheets against pay runs so you catch errors, overpayments and underpayments before payroll is approved.",
      },
    ],
    capabilities: [
      {
        title: "Revenue reconciliation",
        detail: "Matches delivered supports from rosters and care logs against claims, invoices and receipts.",
      },
      {
        title: "Claim leakage alerts",
        detail: "Detects services delivered but not billed, with drill-down to the underlying records.",
      },
      {
        title: "Unspent funds detection",
        detail: "Flags under-utilised budgets and approaching expiry windows from connected funding data.",
      },
      {
        title: "Net margin per participant",
        detail: "Links service delivery records to finance and payroll to calculate true margin per client.",
      },
      {
        title: "Timesheet vs pay run reconciliation",
        detail: "Line-by-line matching of roster and time entries to payroll pay lines.",
      },
      {
        title: "Overtime and penalty hotspotting",
        detail: "Pinpoints the shifts, clients and staff patterns driving premium rates.",
      },
      {
        title: "Cost centre and SIL house allocation",
        detail: "Groups wage cost by SIL house, region, branch or program.",
      },
      {
        title: "Board-ready reporting",
        detail: "EBITDA-style views, wage %, utilisation and month-on-month variance summaries.",
      },
      {
        title: "Multi-entity views",
        detail: "Consolidated or entity-by-entity reporting where multiple finance entities are connected.",
      },
    ],
    useCases: [
      {
        title: "The silent leak",
        detail:
          "You appear profitable, but Oliver detects delivered supports that never became invoices because roster data and finance records don't match. You bill the gap immediately.",
      },
      {
        title: "The over-serviced client",
        detail:
          "A client is running at -15% margin because service times keep falling into penalty windows with senior staff assigned. You adjust roster mix and timing while maintaining care quality.",
      },
      {
        title: "The ghost shift",
        detail:
          "A staff member was paid for a shift that doesn't exist in the roster or care records. You investigate before the pay run is approved.",
      },
    ],
    valueModel: {
      heading: "What a month of finance admin looks like",
      rows: [
        { before: "32 hours of admin for accounting and managers", after: "Board-ready report in 3 minutes" },
        { before: "$8k a month in analyst cost", after: "Answers from Ask Oliver in about a minute" },
        { before: "$120k a year cost to the business", after: "$120k a year saving" },
      ],
      footnote: "Illustrative model from Curki's value metrics. Results vary by organisation.",
    },
    askPrompts: [
      "Which clients had the lowest margin last month?",
      "Which shifts are driving the most penalty rates?",
      "Where are unspent funds building up?",
    ],
    uncertainty: [
      {
        title: "Asks when data is missing",
        detail:
          "“I can calculate margin once I have your pay category mapping for penalties. Do you want to connect payroll, or provide mapping rules?”",
      },
      {
        title: "Clarifies vague questions",
        detail:
          "“I can check profitability, wage-to-revenue, leakage alerts or cash-flow risk. Which would you like first?”",
      },
      {
        title: "Shows its sources",
        detail:
          "When Oliver says a client is unprofitable, it references the exact connected records: system, period and record IDs.",
      },
    ],
    boundaries: [
      { title: "No legal or tax advice", detail: "It doesn't replace your accountant or advise on tax lodgement." },
      {
        title: "No guessing",
        detail: "If data is missing or inconsistent, it flags the gap and asks for the connection or mapping.",
      },
      {
        title: "No write-back by default",
        detail: "Insights are read-only. You approve and make corrections in your source systems.",
      },
      { title: "No payments", detail: "It analyses and flags pay-run issues. It never executes payments." },
      {
        title: "No care decisions",
        detail: "It flags low-margin packages but never recommends discontinuing care. People decide.",
      },
    ],
    connect: {
      systems: ["Care management / rostering", "Finance", "Payroll", "HR"],
      configure: ["Pay category and penalty mapping", "Client and staff ID mapping across systems", "Pay periods"],
    },
    fit: {
      idealFor:
        "CEOs, CFOs, finance, payroll and operations leaders at organisations with 20+ participants or staff, dealing with margin pressure, disconnected systems and heavy manual reporting.",
      notIdealFor: "Sole traders with very low transaction volume and no roster or payroll complexity.",
    },
    personas: ["CEOs & Owners", "CFOs & Finance Managers", "Payroll Managers", "Operations Managers"],
    industries: ["aged-care-ndis"],
    security: [
      "Payroll views can be restricted to finance and payroll roles",
      "Never asks for TFNs or bank details",
      "Support access only with your explicit permission",
    ],
    faqs: [
      {
        question: "Does Oliver replace my bookkeeper or accountant?",
        answer:
          "No. Oliver works like a digital analyst that helps your finance team find issues faster. It automates reconciliation and highlights variances so your experts can focus on decisions and action.",
      },
      {
        question: "Do I need to change my finance, payroll or care software?",
        answer:
          "No. Oliver connects to your existing systems via API and creates an insights layer on top. Nothing is replaced.",
      },
      {
        question: "How does Oliver detect unbilled hours?",
        answer:
          "It matches delivered supports from rosters and service logs to claims and invoices. If a delivery record exists without a matching billing record, it flags it and shows the supporting references.",
      },
      {
        question: "Can I see profitability for NDIS and HCP clients separately?",
        answer:
          "Yes. Oliver segments by funding stream (NDIS, HCP, CHSP or private) where those fields are available in your connected systems.",
      },
      {
        question: "Does Oliver support SCHADS?",
        answer:
          "Rules can be configured to audit patterns commonly relevant to SCHADS, such as breaks, rest periods, sleepovers, broken shifts, overtime and penalties. Your award interpretation settings stay in your payroll system.",
      },
      {
        question: "Can it catch underpayments as well as overpayments?",
        answer: "Yes. It flags both “paid less than expected” and “paid more than expected” based on roster evidence and configured rules.",
      },
      {
        question: "What if our systems use different client or staff IDs?",
        answer:
          "Oliver supports ID mapping and reconciliation rules. If automatic matching can't resolve something, it prompts you through a short mapping step.",
      },
      {
        question: "How often does the data refresh?",
        answer:
          "It depends on each connector and your chosen refresh settings, from near real-time to scheduled syncs. We'll confirm what each of your systems supports.",
      },
    ],
    quote:
      "From hours of reconciliation to minutes of clarity. Unlock precise profit visibility without changing your existing software.",
    related: ["will-rostering", "james-compliance"],
  },
  {
    slug: "zoe-documentation",
    name: "Zoe AI",
    shortName: "Zoe",
    role: "Documentation Associate",
    domain: "Voice to document",
    icon: "mic",
    tagline: "Turns spoken updates into structured, professional notes in seconds.",
    h1: "Zoe AI: voice-to-document AI for care notes and reports",
    summary:
      "Zoe turns spoken updates into professional, structured documentation in seconds, so staff spend less time typing and more time delivering care, while managers get complete, consistent notes they can rely on.",
    seo: {
      title: "Zoe AI: Voice-to-Document AI for Care Notes | Curki AI",
      description:
        "Staff speak, Zoe AI drafts structured progress, incident and support coordination notes. Every note is reviewed and approved before it's saved.",
      keywords: [
        "voice to text care notes",
        "AI progress notes",
        "NDIS documentation software",
        "support coordination reports",
        "aged care documentation automation",
      ],
    },
    image: {
      src: zoeImg,
      alt: "Portrait of Zoe AI, Curki's Documentation Associate wearing a headset",
    },
    art: {
      name: "zoe-voice-to-document",
      alt: "Illustration of Zoe AI turning a spoken update into a structured care note",
      bg: "#efd9c3",
    },
    // Zoe is the voice-capture associate, so the recording pulse belongs here and nowhere else.
    pulse: true,

    cardOutcomes: [
      "Replace end-of-shift typing with voice capture",
      "Prompts for missing details before a note is approved",
      "Handover summaries of what changed, generated automatically",
    ],
    problem: {
      before:
        "Staff spend a large chunk of the shift typing notes, often rushed at the end. Notes can be short, vague or missing key details, and managers chase missing evidence, especially after incidents.",
      pains: [
        "End-of-shift note typing and burnout",
        "Vague notes missing time, actions or follow-ups",
        "Inconsistent quality across a diverse workforce",
        "Managers chasing incomplete records",
      ],
    },
    solution: {
      after:
        "A worker speaks: “Jane ate well, but seemed anxious about medication and needed reassurance.” Zoe drafts a clean note with headings for observations, actions, outcomes, risks and follow-ups. The worker reviews, edits if needed and approves.",
    },
    outcomes: [
      {
        title: "Cut documentation time",
        detail: "Voice capture and auto-structuring replace typing.",
      },
      {
        title: "End end-of-shift burnout",
        detail: "Notes are drafted right after the visit, not hours later.",
      },
      {
        title: "Better, more complete notes",
        detail: "Consistent structure, clearer language and fewer missing details.",
      },
      {
        title: "Consistency across your workforce",
        detail: "Quality no longer depends on typing speed, spelling or writing confidence.",
      },
      {
        title: "Faster handovers",
        detail: "Short shift summaries and “what changed” snapshots.",
      },
      {
        title: "Less manager chasing",
        detail: "Notes are completed faster, with fewer omissions.",
      },
    ],
    capabilities: [
      {
        title: "Voice capture and transcription",
        detail: "Record a conversation, or upload a transcript or recording (DOC, PDF, TXT, MP3, WAV, WEBM, MP4, MOV).",
      },
      {
        title: "Auto-structuring",
        detail: "Organises content into consistent headings such as Goal, Actions, Outcomes, Risks and Plan, or your own format.",
      },
      {
        title: "Tone and clarity clean-up",
        detail: "Removes filler words, fixes grammar and turns casual speech into professional language.",
      },
      {
        title: "Mandatory-field prompts",
        detail: "Asks for missing essentials, like time or actions taken, before a note can be approved.",
      },
      {
        title: "Risk keyword flagging",
        detail: "Highlights phrases such as “fall”, “bruise”, “refused meds” or “wandering”.",
      },
      {
        title: "Template library",
        detail: "Admins curate progress, incident, behaviour, medication support and support coordination templates. Staff select from them.",
      },
      {
        title: "Care terminology",
        detail: "Handles common care terms and abbreviations, with a configurable glossary.",
      },
      {
        title: "Write-back with Curki Sage",
        detail: "Approved notes are written back to the participant record in your core system through the Curki Sage connector.",
      },
      {
        title: "Audit trail",
        detail: "Logs who created and approved each note, and when.",
      },
    ],
    useCases: [
      {
        title: "Staff who aren't confident typing",
        detail:
          "A worker who struggles with spelling and typing speaks naturally. Zoe removes filler words, fixes grammar and produces a professional note they can approve.",
      },
      {
        title: "An incident, captured now",
        detail:
          "Instead of remembering details hours later, staff dictate straight away. Zoe prompts for time, location, witnesses and actions taken, then drafts a narrative for review.",
      },
      {
        title: "Support coordination reporting",
        detail:
          "A coordinator dictates findings and outcomes during or after visits. Zoe turns them into structured case notes and summary drafts that can feed longer reports.",
      },
    ],
    valueModel: {
      heading: "Support coordination reporting, 20 coordinators",
      rows: [
        { before: "1.5 hours per report", after: "10 minutes per report" },
        { before: "$36,000 a month in operating cost", after: "About 1.2 hours saved per report" },
        { before: "$400k a year cost to the business", after: "$300k a year in billable hours" },
      ],
      footnote: "Illustrative monthly model from Curki's value metrics. Results vary by organisation.",
    },
    uncertainty: [
      { title: "Unclear audio", detail: "Flags the sentence and asks the worker to confirm: “Did you say hypo or hyper?”" },
      {
        title: "Missing details",
        detail: "“You mentioned a fall. What time did it occur, and what actions were taken?”",
      },
      {
        title: "Conservative output",
        detail: "If something is ambiguous, Zoe asks for clarification instead of inventing facts.",
      },
    ],
    boundaries: [
      { title: "No secret recording", detail: "Recording is always started by the user, for consent-led workflows." },
      { title: "No clinical diagnosis", detail: "Documents observed symptoms. Never diagnoses conditions." },
      { title: "No auto-submission", detail: "A staff member reviews and approves every note. The worker is the author; Zoe is the scribe." },
      { title: "No unapproved escalation", detail: "Can flag risk but never contacts external parties automatically." },
      { title: "No unnecessary personal data", detail: "Never asks for TFNs, bank details or unrelated personal information." },
    ],
    connect: {
      systems: ["Care management / case notes", "Rostering (optional, to pre-select participants)"],
      configure: ["Note templates", "Mandatory prompts", "Roles and approval permissions", "Participant privacy settings"],
    },
    fit: {
      idealFor:
        "Support workers, nurses, support coordinators and care managers in aged care and NDIS environments with high visit volumes and heavy documentation load.",
      notIdealFor:
        "Admin-only roles with no direct care notes, or organisations that don't need structured visit documentation.",
    },
    personas: ["Support Workers", "Nurses", "Support Coordinators", "Care & Operations Managers"],
    industries: ["aged-care-ndis"],
    security: [
      "Audio can be configured to be deleted after transcription",
      "Only the final approved note and audit metadata are stored",
      "Role-based access to view and approve notes",
    ],
    faqs: [
      {
        question: "Do staff have to type anything?",
        answer: "Very little. Staff speak, review or edit the draft, then approve. Typing becomes optional.",
      },
      {
        question: "Is the worker still responsible for the note?",
        answer: "Yes. The worker is the author and Zoe is the scribe. Every note needs the worker's approval.",
      },
      {
        question: "Will Zoe make up details?",
        answer: "No. It drafts only from what the worker said, and prompts for missing facts rather than inventing them.",
      },
      {
        question: "Does it work for workers with strong accents?",
        answer:
          "Yes. Zoe is designed for a diverse Australian workforce, and prompts and vocabulary can be tuned if accuracy varies.",
      },
      {
        question: "Can we use our own note format?",
        answer: "Yes. Admins configure templates and headings in the portal, and staff choose from that library.",
      },
      {
        question: "Do notes write back into our care management system?",
        answer: "Yes. Approved notes can be written back to the participant record through the Curki Sage connector.",
      },
      {
        question: "Does it work on mobile?",
        answer: "Yes. Staff can use Zoe through mobile web. No app install is required.",
      },
      {
        question: "Do you keep the voice recordings?",
        answer:
          "Audio handling is designed to be transient and can be configured for deletion right after transcription. We'll confirm the exact setting for your deployment.",
      },
    ],
    quote: "Give staff their time back. Turn documentation into a fast voice workflow with a safe review step.",
    related: ["james-compliance", "will-rostering"],
  },
  {
    slug: "alex-hr-onboarding",
    name: "Alex AI",
    shortName: "Alex",
    role: "HR Associate",
    domain: "Hiring & onboarding",
    icon: "user-plus",
    tagline: "Your AI HR manager. Runs hiring to onboarding as one conversation.",
    h1: "Alex AI: AI recruitment and staff onboarding, from resume to shift-ready",
    summary:
      "Alex runs the entire hire-to-onboard journey as a conversational agent: resumes, screening, tests, training and document collection, all the way to credentialed, shift-ready staff. You provide the job description and resumes; Alex handles the rest and reports back.",
    seo: {
      title: "Alex AI: AI Recruitment & Staff Onboarding | Curki AI",
      description:
        "Screen resumes, send tests, assign training and collect worker checks in one conversation. Alex AI gets new staff credentialed and shift-ready.",
      keywords: [
        "AI recruitment software",
        "staff onboarding automation",
        "NDIS worker screening check tracking",
        "resume screening AI",
        "workforce credential management",
      ],
    },
    image: {
      src: alexImg,
      alt: "Portrait of Alex AI, Curki's HR Associate for hiring and onboarding",
    },
    art: {
      name: "alex-hr",
      alt: "Illustration of Alex AI screening candidates and verifying worker checks before day one",
      bg: "#ede3d9",
    },

    cardOutcomes: [
      "Screen and shortlist resumes against the job description",
      "Collect and verify mandatory checks before day one",
      "Run tests, training and onboarding in parallel",
    ],
    problem: {
      before:
        "A role is posted and resumes pile up. HR reads every CV, emails candidates one by one, chases documents and clearances for weeks and tracks onboarding across spreadsheets and inboxes. Start dates slip, and occasionally a worker starts before a check clears.",
      pains: [
        "Manually reading every application",
        "Weeks spent chasing documents and clearances",
        "Onboarding tracked across spreadsheets and inboxes",
        "Surge hiring overwhelming a small HR team",
      ],
    },
    solution: {
      after:
        "Drop in the job description and resumes. Alex screens, ranks and shortlists, then, on your word, sends screening tests, assigns training and requests every required document. You watch progress in one place, approve key steps, and new starters are cleared before day one.",
    },
    outcomes: [
      { title: "Faster time-to-hire", detail: "Automated resume screening and shortlisting instead of reading every application." },
      { title: "Ready on day one", detail: "Tests, training and onboarding run in parallel, so new starters aren't waiting until week three." },
      { title: "Lower cost-per-hire", detail: "Fewer admin hours screening, chasing documents and coordinating onboarding." },
      {
        title: "No starting without clearance",
        detail: "Onboarding can't complete until required documents and checks are verified.",
      },
      { title: "Consistent, fair screening", detail: "The same criteria applied to every candidate, every time." },
      {
        title: "One clear record",
        detail: "A trail of who was screened, tested, trained, cleared and onboarded, ready for governance and quality reviews.",
      },
    ],
    capabilities: [
      {
        title: "Resume screening and shortlisting",
        detail: "Reads resumes against the job description and ranks candidates with a clear reason for each.",
      },
      {
        title: "Conversational control",
        detail: "Manage the pipeline by chatting: “shortlist the top 5”, “send the screening test”, “start onboarding”.",
      },
      {
        title: "Screening tests",
        detail: "Sends role-relevant tests, collects results and summarises who passed.",
      },
      {
        title: "Training assignment",
        detail: "Assigns and tracks pre-start training such as induction, manual handling and infection control.",
      },
      {
        title: "Document and check collection",
        detail:
          "Requests and tracks police checks, NDIS Worker Screening, Working With Children checks, right-to-work, qualifications, licences and tickets.",
      },
      {
        title: "Onboarding orchestration",
        detail: "Drives new starters through offer acceptance, paperwork, policy acknowledgements and setup.",
      },
      {
        title: "Pipeline visibility",
        detail: "See where every candidate is: screened, shortlisted, tested, trained, cleared or onboarded.",
      },
      {
        title: "Configurable per role and site",
        detail: "Screening criteria, tests, training and required documents are set up in the portal.",
      },
    ],
    useCases: [
      {
        title: "A standard hire",
        detail:
          "For an NDIS support worker: resumes in, Alex shortlists, sends the screening test, assigns induction training, requests NDIS Worker Screening, a police check and WWCC, verifies them and onboards.",
      },
      {
        title: "Surge hiring",
        detail:
          "For aged care or hospitality: Alex screens and ranks a whole batch, you approve the shortlist in one step, and tests, training and document requests go to every candidate automatically.",
      },
      {
        title: "Licensed and ticketed roles",
        detail:
          "For transport or field services: Alex requires the relevant licence or ticket, such as a driver's licence or white card, and won't mark a worker ready until it's collected.",
      },
    ],
    valueModel: {
      heading: "Onboarding six new staff a month",
      rows: [
        { before: "25+ hours per new staff member (150 hours a month)", after: "Screening, tests, training and documents run by Alex" },
        { before: "Weekly manual document and credential checks", after: "100% document and credential tracking" },
        { before: "$100k a year cost to the business", after: "$50k a year saving" },
      ],
      footnote: "Illustrative monthly model from Curki's value metrics. Results vary by organisation.",
    },
    askPrompts: ["Shortlist the top 5 candidates.", "Send the screening test to these candidates.", "Request documents for the new starters."],
    uncertainty: [
      { title: "Ambiguous resumes", detail: "Flags gaps or unclear experience and asks you to confirm rather than guessing." },
      { title: "Missing documents", detail: "Prompts for what's outstanding and follows up with the candidate before onboarding can complete." },
      { title: "Borderline candidates", detail: "Surfaces close calls for a human decision instead of auto-rejecting." },
    ],
    boundaries: [
      { title: "No hiring decisions without you", detail: "Alex recommends and prepares. People approve shortlists, hires and final onboarding." },
      { title: "No auto-rejecting close calls", detail: "Borderline candidates always go to a person." },
      { title: "No replacing your HR system", detail: "Alex works on top of your HR, ATS or HRIS system and complements it." },
    ],
    connect: {
      systems: ["HR / ATS / HRIS", "Background check provider (optional)", "Learning management system (optional)"],
      configure: [
        "Roles and screening criteria",
        "Required tests per role",
        "Mandatory training",
        "Required documents and checks per role and site",
        "Who can shortlist, approve hires and sign off onboarding",
      ],
    },
    fit: {
      idealFor:
        "HR and operations teams across aged care and NDIS, healthcare, field services, transport and hospitality who hire regularly or in surges.",
    },
    personas: ["HR Managers", "Operations Managers", "CEOs & Owners"],
    industries: [
      "aged-care-ndis",
      "healthcare-allied-health",
      "field-services",
      "transport-postal-warehousing",
      "hospitality-venues",
    ],
    security: [
      "Only authorised users can see candidate data, results and documents",
      "Sensitive documents handled according to your retention policy",
      "Logs who screened, tested, cleared and onboarded each candidate",
    ],
    faqs: [
      {
        question: "Does Alex replace our HR or ATS system?",
        answer:
          "No. Alex connects via API and runs screening, testing, training and onboarding on top of your system, linking the records so your team acts faster and more consistently.",
      },
      {
        question: "Who makes the hiring decision?",
        answer: "You do. Alex screens, ranks and recommends; people approve shortlists and final hires.",
      },
      {
        question: "Can we use our own screening criteria and templates?",
        answer: "Yes. Screening criteria, tests, training and required documents are configured per role and site.",
      },
      {
        question: "How does Alex handle mandatory checks and documents?",
        answer:
          "It requests, collects and tracks required checks and documents, and onboarding can be set so it can't complete until mandatory items are verified.",
      },
      {
        question: "Does it work outside aged care and NDIS?",
        answer:
          "Yes. Alex works for healthcare, field services, transport and hospitality too. The required checks, licences and training simply map to each industry.",
      },
      {
        question: "Can managers stay in the loop?",
        answer: "Yes. Role-based workflows let managers review and approve at the steps you choose.",
      },
      {
        question: "Our HR team isn't technical. Will they cope?",
        answer: "Yes. It's a conversation: you tell Alex the next step in plain language and it does it.",
      },
    ],
    quote:
      "Give HR their time back. Turn hiring and onboarding into one conversation, from resume screening to credentialed, shift-ready staff.",
    related: ["will-rostering", "zoe-documentation"],
  },
  {
    slug: "will-rostering",
    name: "Will AI",
    shortName: "Will",
    role: "Rostering Associate",
    domain: "Smart rostering",
    icon: "calendar-clock",
    tagline: "Always-on rostering assistant that fills shift gaps in minutes, not hours.",
    h1: "Will AI: AI rostering that fills shift gaps in minutes",
    summary:
      "Will matches the right staff to the right participant based on skills, credentials, distance, continuity and cost risk, automating last-minute sick calls and unfilled shifts without blowing your overtime budget.",
    seo: {
      title: "Will AI: AI Rostering & Shift Fill Automation | Curki AI",
      description:
        "Fill sick calls and unfilled shifts in about 2 minutes. Will AI ranks qualified staff by cost, distance and continuity, and texts them for you.",
      keywords: [
        "AI rostering software",
        "shift fill automation",
        "NDIS rostering",
        "reduce overtime and penalty rates",
        "aged care staff scheduling",
      ],
    },
    image: {
      src: willImg,
      alt: "Portrait of Will AI, Curki's Rostering Associate",
    },
    art: {
      name: "will-rostering",
      alt: "Illustration of Will AI filling an open shift with a nearby qualified worker",
      bg: "#efe6dd",
    },

    cardOutcomes: [
      "Fill urgent gaps in about 2 minutes",
      "Reduce overtime and penalty-rate exposure",
      "Match the closest qualified staff to cut travel cost",
    ],
    problem: {
      before:
        "A sick call arrives at 7:00am. Rostering spends 1–2 hours calling and texting workers and books whoever answers first, often someone who triggers penalties. Participants find out late.",
      pains: [
        "Hours of phone tag and manual texting",
        "Booking whoever answers, not who fits best",
        "The same preferred staff on premium-rate shifts",
        "Participants finding out about changes late",
      ],
    },
    solution: {
      after:
        "Enter the gap in Curki.ai. Will ranks the top candidates by skills, location, rate risk and continuity, sends SMS invites and presents the first valid “YES” to you for confirmation. The shift is covered quickly, at the lowest feasible cost.",
    },
    outcomes: [
      { title: "Fill gaps in about 2 minutes", detail: "Instead of hours of phone tag and manual texting." },
      { title: "Reduce overtime and penalties", detail: "Staff who can work at standard rates are prioritised." },
      { title: "Lower travel cost", detail: "Match the staff closest to the participant or to their previous shift." },
      { title: "Fairer shift distribution", detail: "Less burnout from constant emergency calls helps retention." },
      { title: "Reliable coverage", detail: "Escalates through tiers until the shift is filled, with your approval." },
      { title: "A clear outreach record", detail: "Who was contacted, when, and why they were ranked or selected." },
    ],
    capabilities: [
      {
        title: "Smart staff ranking",
        detail: "Scores staff by availability, skills and credentials, distance, continuity, preferences and overtime risk.",
      },
      {
        title: "Two-way SMS invites",
        detail: "Sends YES/NO job offers to a short list, like the top 5, instead of spamming everyone.",
      },
      {
        title: "Human approval",
        detail: "Will recommends and validates; a rostering manager confirms before the shift is assigned.",
      },
      {
        title: "Skills filtering",
        detail: "Excludes staff without required tags such as manual handling, hoist or PEG feeding.",
      },
      {
        title: "Proximity matching",
        detail: "Estimates travel time from a staff member's location or previous shift to the participant.",
      },
      {
        title: "Continuity first",
        detail: "Prefers staff who have supported the participant before (configurable).",
      },
      {
        title: "Your ranking priorities",
        detail: "Weight the ranking towards lowest cost, closest, best continuity or best skills match.",
      },
      {
        title: "Templates and escalation",
        detail: "SMS templates for urgent, weekend, night and day shifts, with cut-off timers and escalation rules.",
      },
    ],
    useCases: [
      {
        title: "The morning sick call",
        detail:
          "A cancellation arrives two hours before a shift. Will finds a nearby, qualified worker with no overtime risk, sends an SMS invite and secures cover quickly.",
      },
      {
        title: "The expensive habit",
        detail:
          "A coordinator keeps choosing the same staff member, who is often in penalty windows. Will ranks an equally qualified, lower-cost staff member higher, protecting margin.",
      },
      {
        title: "The skills match",
        detail:
          "A high-needs participant requires PEG feeding. Will filters out anyone without the tag, preventing a mismatch before it happens.",
      },
    ],
    valueModel: {
      heading: "Four weeks of rostering, 400 staff",
      rows: [
        { before: "612 overtime hours, costing $18k", after: "Staff allocated within 2 minutes" },
        { before: "164 unallocated shifts", after: "AI matching on overtime, distance and skills" },
        { before: "$228k a year cost to the business", after: "At least 50% saving: $114k a year" },
      ],
      footnote: "Illustrative sample from Curki's value metrics. Results vary by organisation.",
    },
    askPrompts: ["Which available staff suit this participant today at 2pm?"],
    uncertainty: [
      {
        title: "No replies",
        detail:
          "“I contacted the top 5 candidates with no response in 15 minutes. Want to widen the radius, extend to the next tier, or allow higher-cost windows?”",
      },
      {
        title: "Conflicts",
        detail:
          "“This staff member replied YES, but appears to have a conflicting shift or unavailability flag. Please confirm before assignment.”",
      },
      {
        title: "Missing skill tags",
        detail:
          "“This participant requires PEG feeding. Several staff profiles are missing this tag. Do you want to update tags or widen the criteria?”",
      },
    ],
    boundaries: [
      { title: "No booking without approval", detail: "Will recommends and validates; a person confirms." },
      { title: "No payroll changes", detail: "Never alters payroll records or bank details." },
      { title: "No clinical judgement", detail: "Uses skill tags and credentials but doesn't assess clinical competency." },
      { title: "No mass texting by default", detail: "Uses a smart shortlist. Broadcasts only if you choose to enable them." },
    ],
    connect: {
      systems: ["Rostering / care management", "Payroll (optional, for cost risk)", "HR (optional)"],
      configure: ["Ranking priorities", "SMS templates", "Cut-off timers and escalation rules", "Participant privacy for messages"],
    },
    fit: {
      idealFor:
        "Rostering coordinators, schedulers and operations managers in aged care, NDIS and home care managing 50+ staff with frequent cancellations and changes.",
      notIdealFor: "Very small providers with fewer than 10 staff, where manual coordination is already easy.",
    },
    personas: ["Rostering Coordinators", "Schedulers", "Operations Managers", "CEOs & Owners"],
    industries: ["aged-care-ndis"],
    security: [
      "Initial SMS invites can show only the suburb, not the full address",
      "Messages are sent 1-to-1; staff never see each other's details",
      "Only authorised rostering managers can trigger outreach",
    ],
    faqs: [
      {
        question: "Does Will replace my rostering system?",
        answer:
          "No. It sits on top as a gap-fill accelerator. It reads roster availability and staff profiles via API, and your core roster remains your system of record.",
      },
      {
        question: "How does it know who is available?",
        answer: "It reads rostered shifts and unavailability from your connected rostering or care management system.",
      },
      {
        question: "Do staff need to download an app?",
        answer: "No. Staff reply to a normal SMS with “YES” or “NO”.",
      },
      {
        question: "What happens if multiple staff accept?",
        answer: "Will collects the acceptances and presents the best candidates to the rostering manager for final confirmation.",
      },
      {
        question: "Does it consider overtime and penalty risk?",
        answer:
          "Yes. If payroll or award data is connected, or pay-category rules are configured, it flags assignments likely to trigger penalties.",
      },
      {
        question: "Can it handle SIL and group rosters?",
        answer: "Yes. It can fill gaps for specific houses and group shifts when house or location data is available.",
      },
      {
        question: "Can I stop certain staff being matched with certain clients?",
        answer: "Yes. If your source system supports “do not pair” rules or exclusions, Will respects them.",
      },
      {
        question: "Do confirmed shifts write back to my rostering system?",
        answer:
          "It depends on the connector and your permissions. Many integrations start read-only; where write-back is supported, it's enabled only with your explicit approval.",
      },
    ],
    quote: "Stop choosing between filling the shift and protecting margin. Will finds the person who solves both.",
    related: ["oliver-finance", "alex-hr-onboarding"],
  },
  {
    slug: "james-compliance",
    name: "James AI",
    shortName: "James",
    role: "Compliance Associate",
    domain: "Incident management & auditing",
    icon: "shield-check",
    tagline: "Always-on quality and risk auditor that reviews every record, not a sample.",
    h1: "James AI: NDIS and aged care incident management and compliance auditing",
    summary:
      "James is Curki's dedicated regulatory and incident compliance associate. It continuously reviews incident logs, complaints and shift notes to detect unreported risks, check documentation against NDIS and aged care standards, and generate audit-ready evidence for investigations, governance and funding reviews.",
    seo: {
      title: "James AI: NDIS & Aged Care Compliance Auditing | Curki AI",
      description:
        "Audit 100% of shift notes and incidents, not a sample. James AI flags unreported incidents, builds timelines and prepares audit-ready evidence.",
      keywords: [
        "NDIS compliance software",
        "incident management software NDIS",
        "aged care incident auditing",
        "unreported incident detection",
        "SIRS incident reporting",
      ],
    },
    image: {
      src: jamesImg,
      alt: "Portrait of James AI, Curki's Compliance Associate",
    },
    art: {
      name: "james-compliance",
      alt: "Illustration of James AI scanning shift notes and incident records for gaps",
      bg: "#f3e4d7",
    },

    cardOutcomes: [
      "Audit 100% of records, not a 5–10% sample",
      "Catch incidents mentioned in notes but never logged",
      "Turn weeks of note-hunting into a clear timeline",
    ],
    problem: {
      before:
        "Compliance managers sample notes, chase incomplete incidents and reconstruct timelines by hand. Incidents get missed until families complain or audits find gaps, and corrective actions are inconsistent.",
      pains: [
        "Only a small sample of notes ever gets reviewed",
        "Incomplete incident records to chase",
        "Timelines rebuilt manually for every investigation",
        "Standards that keep changing",
      ],
    },
    solution: {
      after:
        "James flags potential reportables, missing follow-ups and unreported incidents automatically. You get a ready-to-review timeline, a draft evidence summary and corrective action prompts, so your team stays proactive, not reactive.",
    },
    outcomes: [
      {
        title: "Catch silent incidents early",
        detail: "For example, a fall mentioned in a progress note with no formal incident created.",
      },
      {
        title: "Faster investigations",
        detail: "Weeks of note-hunting become a clear, chronological timeline of who, what and when.",
      },
      {
        title: "Better governance reporting",
        detail: "Risk trends by participant, house or site, shift type, day and time, and staff cohort.",
      },
      {
        title: "Prevent escalation",
        detail: "Early warning signals like behavioural triggers, medication refusals and repeated near-misses.",
      },
      {
        title: "Improve staff practice",
        detail: "Identify documentation gaps and training needs. System improvement, not blame.",
      },
      {
        title: "Always audit 100%",
        detail: "Every record reviewed, not a 5–10% sample, with human review where it matters.",
      },
    ],
    modules: [
      {
        title: "Participant Events & Incident Management",
        detail:
          "Flags potential reportable incidents based on your configured definitions, prompts for missing required fields and tracks follow-ups and corrective actions.",
      },
      {
        title: "Incident Auditing",
        detail:
          "Cross-checks shift notes against the incident register, surfaces risk patterns and assembles evidence summaries and timelines for audits and reviews.",
      },
    ],
    capabilities: [
      {
        title: "Unreported incident detection",
        detail: "Cross-checks shift and progress notes against the incident register for events that were never recorded.",
      },
      {
        title: "Reportable incident readiness",
        detail: "Prompts for missing required fields: time, location, immediate actions, witnesses and escalation.",
      },
      {
        title: "Evidence summaries",
        detail: "Collates relevant notes into a structured narrative of who, what, when, impact and actions.",
      },
      {
        title: "Forensic timelines",
        detail: "Builds a chronological timeline across notes, incidents, communications and actions.",
      },
      {
        title: "Risk pattern recognition",
        detail: "Detects trends in falls, medication refusal, behaviours of concern and skin integrity by participant, site and time.",
      },
      {
        title: "Restrictive practice alerting",
        detail: "Flags language that may indicate restrictive practices for review against your policy.",
      },
      {
        title: "Complaint correlation",
        detail: "Connects complaint themes with incident patterns to separate systemic issues from isolated events.",
      },
      {
        title: "Documentation quality insights",
        detail: "Spots repeated gaps like missing detail, late notes or missing immediate actions to inform coaching.",
      },
      {
        title: "Board-ready reporting",
        detail: "Trend summaries and risk heatmaps for governance packs.",
      },
    ],
    useCases: [
      {
        title: "The hidden incident",
        detail:
          "A worker writes “client slipped in shower” in shift notes. James finds no matching incident entry and alerts the quality manager to review and lodge appropriately.",
      },
      {
        title: "The funding evidence pack",
        detail:
          "For a plan review, James scans a defined period and compiles a structured chronology of behaviours, risks, escalation and interventions, ready for internal review.",
      },
      {
        title: "The pattern spotter",
        detail:
          "Skin tears spike on weekends at one house. James highlights the trend so you can investigate staffing mix, handover quality, hazards or training gaps.",
      },
    ],
    uncertainty: [
      {
        title: "Ambiguous language",
        detail:
          "“The note says ‘client was upset’, but there are indicators of verbal aggression. Do you want this flagged as a potential behavioural incident for review?”",
      },
      {
        title: "Missing required data",
        detail:
          "“Incident #123 has no follow-up date or immediate action recorded. This may block closure. Please add before finalising.”",
      },
      {
        title: "Conservative by design",
        detail: "James flags potential risks and asks for confirmation rather than asserting conclusions.",
      },
    ],
    boundaries: [
      {
        title: "No auto-lodgement",
        detail: "It prepares drafts and checks completeness. A person reviews and submits to external portals.",
      },
      { title: "No legal advice", detail: "Highlights compliance risks but doesn't determine liability." },
      { title: "No clinical diagnosis", detail: "Flags symptoms and keywords; never diagnoses medical causes." },
      { title: "No invented facts", detail: "If information is missing, James asks for it." },
    ],
    connect: {
      systems: ["Care management / progress notes", "Incident / risk register", "Complaints system (optional)"],
      configure: [
        "Incident categories and severity levels",
        "Reportable definitions and prompts",
        "Corrective action fields: owner, due date, closure criteria",
        "Alerting rules and who is notified",
      ],
    },
    fit: {
      idealFor:
        "Quality and compliance managers, operations managers, team leaders and CEOs of NDIS and aged care providers (typically 20+ participants) who need audit-ready governance and time-bound incident control.",
      notIdealFor:
        "Providers with paper-only shift notes and incident logs, or organisations unwilling to standardise incident workflows.",
    },
    personas: ["Quality & Compliance Managers", "Operations Managers", "Team Leaders", "CEOs & Owners"],
    industries: ["aged-care-ndis"],
    security: [
      "Incident outputs restricted to authorised compliance and leadership roles",
      "Reporting can run on anonymised participant IDs",
      "2FA and SSO for secure access",
    ],
    faqs: [
      {
        question: "Does James replace our incident management system?",
        answer:
          "No. It audits and augments your existing system, linking incident records with shift notes and related evidence so your team can act faster and more consistently.",
      },
      {
        question: "How does James detect unreported incidents?",
        answer:
          "It scans shift notes for incident indicators such as falls, injuries, aggression, medication refusal or ambulance attendance, and checks whether a matching entry exists in your incident register.",
      },
      {
        question: "Does it submit reportable incidents to the NDIS Commission?",
        answer: "No. It helps you prepare and validate the content, but submission always remains a human-controlled step.",
      },
      {
        question: "Can we customise what counts as reportable or high risk?",
        answer:
          "Yes. Definitions, keywords, severity thresholds and required fields can be configured to match your governance framework.",
      },
      {
        question: "Does it support aged care SIRS categories?",
        answer:
          "It can support SIRS-style categorisation and prompts where configured. We'll confirm your exact decision-tree requirements during onboarding.",
      },
      {
        question: "How do you prevent false positives?",
        answer:
          "Items are flagged as “needs review” and James asks for clarification rather than auto-labelling. You can tune the rules over time.",
      },
      {
        question: "Can James audit notes created with Zoe AI?",
        answer: "Yes. If voice-generated notes are stored in your connected system, James audits them like any other shift note.",
      },
      {
        question: "Does it work if our notes are messy or inconsistent?",
        answer: "Yes. It normalises and structures text for detection and summarisation, then asks for missing details where needed.",
      },
    ],
    quote:
      "Don't wait for an audit to find your gaps. Let AI audit everything, all the time, and give your team only the exceptions worth reviewing.",
    related: ["zoe-documentation", "alex-hr-onboarding"],
  },
];

export function getAssociate(slug: string): Associate | undefined {
  return associates.find((a) => a.slug === slug);
}

export function getRelated(associate: Associate): Associate[] {
  return associate.related
    .map((slug) => getAssociate(slug))
    .filter((a): a is Associate => Boolean(a));
}
