export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  title: string;
  items: FAQItem[];
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        id: "gs-1",
        question: "What types of law firms do you work with?",
        answer:
          "Archer Advisory works exclusively with law firms — from solo practitioners and boutique litigation practices to multi-partner regional firms. Our deepest experience is with firms operating in practice areas that carry the heaviest compliance obligations: real estate, immigration, family law, M&A, and any practice with significant client trust activity. We do not serve accounting firms, corporations, or non-legal entities, which means our advisors have no competing specialisations and are focused entirely on the regulatory and financial environment specific to legal practice.",
      },
      {
        id: "gs-2",
        question: "How does the onboarding process work?",
        answer:
          "Every engagement begins with a no-obligation discovery call, followed by a structured assessment of your firm's current financial processes, compliance documentation, and technology stack. Within ten business days of the assessment, we deliver a written findings report that identifies gaps, prioritises risk areas, and outlines the specific services we would recommend. Only after you have reviewed and approved the scope do we issue an engagement letter. The typical time from first call to active engagement is three to four weeks.",
      },
      {
        id: "gs-3",
        question: "How quickly can you integrate with our existing practice management system?",
        answer:
          "For firms using Clio, MyCase, Cosmolex, or Rocket Matter, we can typically establish a read/write integration within five business days. QuickBooks Online, Xero, and Sage Intacct integrations are usually live within the same timeframe. More complex environments — particularly those with custom matter management databases or legacy on-premise systems — are scoped individually during the assessment. We do not require you to change your software stack to work with us; we adapt to your environment.",
      },
    ],
  },
  {
    id: "compliance-law-society",
    title: "Compliance & Law Society",
    items: [
      {
        id: "cls-1",
        question: "What AML obligations apply to law firms specifically?",
        answer:
          "Law firms are designated non-financial businesses and professions (DNFBPs) under FATF guidance and most domestic AML frameworks, which means they carry mandatory anti-money-laundering obligations when they handle client funds, manage real property transactions, or facilitate corporate structuring. Concretely, this requires your firm to maintain a written AML policy, conduct client risk assessments before accepting instructions, perform enhanced due diligence on high-risk clients, train fee-earners and staff annually, and file suspicious activity reports where required. The precise thresholds and filing requirements vary by jurisdiction. Archer designs and implements AML programmes tailored to your jurisdiction and practice mix — not generic checklists.",
      },
      {
        id: "cls-2",
        question: "How do you help with conflict checks — isn't that a legal ethics issue, not an accounting one?",
        answer:
          "Conflict checks live at the intersection of ethics and data management, and most firms underinvest in both. We advise on the design and configuration of your conflict identification process — how your practice management system's conflict database is structured, what fields are captured at intake, how adverse parties are matched, and how flagged conflicts are escalated, documented, and resolved. We also advise on the policies that govern those decisions, including waiver procedures and the documentation required by your state bar. We do not provide legal ethics opinions, but we work alongside your ethics counsel so that the operational infrastructure reflects the legal requirements they have identified.",
      },
      {
        id: "cls-3",
        question: "What does a bar association financial examination actually involve, and can you help us prepare?",
        answer:
          "Most state bar financial examinations focus on your trust account records: the daily three-way reconciliation (bank statement × client ledger × trust ledger), the source and disbursement documentation for each matter, and your written procedures for handling client funds. Examiners commonly look for unexplained differences between the bank balance and the sum of client ledger balances, missing or undated disbursement records, fees withdrawn before they are earned, and commingling of operating and trust funds. Archer prepares the complete workpaper package for examinations — including reconciled ledgers, transaction-level documentation, and a written procedures memo — and one of our senior advisors accompanies your finance team during the examination itself.",
      },
      {
        id: "cls-4",
        question: "We discovered a trust account discrepancy. What should we do immediately?",
        answer:
          "Stop all non-urgent trust disbursements from the affected account while you identify the source of the discrepancy. Do not attempt to correct the balance with unexplained journal entries. Document everything — every transaction, every communication, and every step you take — before you make any changes. Most state bars require prompt notification when a trust account shortage is discovered, even if it results from a bookkeeping error rather than misappropriation; the notification deadline is typically very short (sometimes 24 to 72 hours). Call us immediately. This is precisely the kind of urgent matter our 24/7 engagement covers, and we will walk you through the required notifications and the corrective reconciliation in real time.",
      },
    ],
  },
  {
    id: "accounting-reconciliation",
    title: "Accounting & Reconciliation",
    items: [
      {
        id: "ar-1",
        question: "How often should trust accounts be reconciled, and what does a proper reconciliation involve?",
        answer:
          "Every state bar requires at minimum a monthly three-way reconciliation: your bank statement balance must be reconciled to your trust ledger balance (the sum of all individual client balances), and both must be reconciled to the individual client matter ledger balances. Many bars also require a daily reconciliation when trust activity is high. A proper reconciliation is not just a top-line balance check — it is a matter-level review that traces every deposit and disbursement to a specific client file, confirms that no client ledger shows a negative balance at any point, and identifies any outstanding items that explain timing differences. Archer performs these reconciliations within your practice management system, not in a separate spreadsheet, so the records are audit-ready in place.",
      },
      {
        id: "ar-2",
        question: "What is the difference between a client ledger and a trust ledger reconciliation?",
        answer:
          "The trust ledger is an aggregate — it shows the total balance of all client funds held in your trust account at the bank. The client ledger (or matter ledger) is a matter-level breakdown showing exactly how much of that aggregate balance belongs to each client or matter. A complete reconciliation requires that (1) the trust ledger balance equals the bank statement balance (adjusted for outstanding items), and (2) the trust ledger balance also equals the sum of all individual client ledger balances. The most common compliance failure we encounter is firms that reconcile the trust ledger to the bank — but never verify that the client ledger balances add up to the same total. That gap is how underfunding goes undetected.",
      },
      {
        id: "ar-3",
        question: "Do you handle legal billing as well as accounting?",
        answer:
          "Yes. Legal billing and financial accounting are inseparable for most firms, and Archer treats them as a single service. We manage the full billing lifecycle: timekeeper rate setting and approval, pre-bill review workflows, LEDES e-billing submission for insurance-defense and corporate clients, collections follow-up on aged receivables, and matter profitability reporting. We also track write-downs and write-offs at the timekeeper and matter level, so your managing partners can see — accurately — where the firm's revenue is being given away. Most accounting firms hand billing back to the legal team; we own it.",
      },
    ],
  },
  {
    id: "working-with-us",
    title: "Working With Us",
    items: [
      {
        id: "wu-1",
        question: "Do we need to change our existing software to work with Archer?",
        answer:
          "No. We integrate with the platforms your firm already uses — Clio, MyCase, Cosmolex, Rocket Matter, Filevine, QuickBooks Online, Xero, Sage Intacct, and NetSuite, among others. If your stack includes a platform we have not integrated with before, we assess it during discovery and will tell you honestly whether integration is feasible and at what cost. We will only recommend a new tool if it directly addresses a gap in your compliance or financial management posture, and we will never recommend software from which we receive a referral fee.",
      },
      {
        id: "wu-2",
        question: "What does a typical engagement cost?",
        answer:
          "Our engagements are scoped individually based on firm size, transaction volume, complexity, and the services selected. Trust accounting and reconciliation for a solo or two-partner firm begins at a fixed monthly retainer in the range of $1,200–$2,500. Full-service engagements for multi-partner firms — including compliance advisory, billing management, and reporting — are priced higher and quoted after the assessment. We do not charge hourly for ongoing advisory; all work is covered by the retainer, including bar examination support and urgent compliance calls. A written quote is included in every engagement proposal.",
      },
    ],
  },
];
