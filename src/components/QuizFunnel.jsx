import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── AUDIENCE PROFILES ────────────────────────────────────────────────────────

const AUDIENCE = {
  private:   'private',
  municipal: 'municipal',
  state:     'state',
  community: 'community',
};

const audienceMeta = {
  [AUDIENCE.private]: {
    label: 'Private Company / Developer',
    badge: 'INDUSTRIAL PROJECT DIAGNOSTIC',
    landingTitle: 'Is LBKH Liaison\na fit for your project?',
    landingSubhead: '7 questions. 3 minutes. Find out if your project is ready for source-locked community engagement — and what it would take to go live within 24 hours.',
    pills: ['AI Infrastructure', 'Renewable Energy', 'Advanced Manufacturing', 'Industrial Campus'],
    strongTitle: 'Your project is ready. We can go live in 24 hours.',
    possibleTitle: 'A few tweaks and this platform is built for you.',
    strongBody: "Your project has the transparency posture, community context, and timeline alignment that makes LBKH Liaison most effective. The source-locked architecture, Benchmark Silo, and live event mode are all directly applicable to what you're facing. We can begin onboarding today and have your Liaison live before your next community touchpoint.",
    possibleBody: "Your project has real potential for the Liaison platform. Some elements may need light customization — whether that's refining your transparency strategy, preparing your document library, or scoping the live event configuration. None of that is a blocker. We've deployed in 24 hours for projects at every stage of the process.",
    formTitle: { strong: 'Book your onboarding call →', possible: "Let's talk about your project →" },
    formSub: {
      strong: "We'll confirm your deployment timeline and get your document library started.",
      possible: "We'll walk through what customization looks like for your specific project and timeline.",
    },
    submitLabel: { strong: 'Book My Onboarding Call →', possible: 'Start the Conversation →' },
    tyBody: {
      strong: "We'll reach out within one business day to confirm your onboarding timeline. In the meantime, explore the live demo to see exactly what your community will experience.",
      possible: "We'll reach out within one business day to walk through what a customized deployment looks like for your project. The demo is ready when you are.",
    },
    webhookOutcome: { strong: 'private_strong_fit', possible: 'private_possible_fit' },
  },
  [AUDIENCE.municipal]: {
    label: 'Municipal / City Government',
    badge: 'MUNICIPAL ENGAGEMENT DIAGNOSTIC',
    landingTitle: 'Is LBKH Liaison\nright for your city?',
    landingSubhead: '7 questions. 3 minutes. Find out how source-locked community engagement can streamline your public approval process and make every resident feel heard.',
    pills: ['City Planning', 'Public Works', 'Community Development', 'Permit & Zoning'],
    strongTitle: 'Your city is ready. Request a Municipal Demo today.',
    possibleTitle: 'The platform fits — let\'s scope it for your process.',
    strongBody: "Your department has the engagement challenges, public meeting volume, and transparency goals that LBKH Liaison is built for. A source-locked Q&A system means residents get accurate, consistent answers 24/7 — and your staff stops answering the same questions at every meeting. We can walk you through a municipal deployment this week.",
    possibleBody: "Your situation has strong alignment with what the Liaison does best. A few process questions and we'll know exactly how to configure it for your approval workflow. Municipal deployments are typically live within 48 hours of document upload.",
    formTitle: { strong: 'Request a Municipal Demo →', possible: 'Request a Municipal Demo →' },
    formSub: {
      strong: "We'll show you exactly how the Liaison handles your public comment period, meeting Q&A, and resident information requests.",
      possible: "We'll walk through what a deployment looks like for your specific approval process and public engagement requirements.",
    },
    submitLabel: { strong: 'Request My Municipal Demo →', possible: 'Request My Municipal Demo →' },
    tyBody: {
      strong: "We'll reach out within one business day to schedule your municipal demo. We'll walk through the public comment workflow, live meeting mode, and how the system creates an audit-ready record of every question answered.",
      possible: "We'll reach out within one business day to discuss your specific process and show you what a configured deployment looks like for your city.",
    },
    webhookOutcome: { strong: 'municipal_strong_fit', possible: 'municipal_possible_fit' },
  },
  [AUDIENCE.state]: {
    label: 'State Agency / Regulatory Body',
    badge: 'REGULATORY ENGAGEMENT DIAGNOSTIC',
    landingTitle: 'Is LBKH Liaison\nright for your agency?',
    landingSubhead: '7 questions. 3 minutes. Find out how source-locked public engagement can strengthen your comment period process and create an audit-ready record of public participation.',
    pills: ['Environmental Review', 'Public Comment Periods', 'Regulatory Hearings', 'EIS / NEPA Process'],
    strongTitle: 'Strong alignment. Request a regulatory demo.',
    possibleTitle: 'Good fit with the right configuration.',
    strongBody: "Your agency's public engagement requirements — comment periods, regulatory hearings, information requests — are exactly what the Liaison is built to handle at scale. Source-locked answers mean every response is grounded in the official record. Every question and answer is logged, citable, and audit-ready.",
    possibleBody: "Your regulatory process has strong alignment with the Liaison platform. A brief scoping conversation will clarify how to configure it for your specific public participation requirements and documentation standards.",
    formTitle: { strong: 'Request a Regulatory Demo →', possible: 'Request a Regulatory Demo →' },
    formSub: {
      strong: "We'll walk through how the Liaison handles large-volume public comment periods and creates a defensible record of public participation.",
      possible: "We'll discuss your specific regulatory process and show you how the platform can be configured to meet your documentation and participation requirements.",
    },
    submitLabel: { strong: 'Request My Regulatory Demo →', possible: 'Request My Regulatory Demo →' },
    tyBody: {
      strong: "We'll reach out within one business day to schedule your regulatory demo. We'll focus on the audit trail, comment period workflow, and how the system handles high-volume public information requests.",
      possible: "We'll reach out within one business day to discuss your agency's specific requirements and what a configured deployment would look like.",
    },
    webhookOutcome: { strong: 'state_strong_fit', possible: 'state_possible_fit' },
  },
  [AUDIENCE.community]: {
    label: 'Community Organization / Advocacy Group',
    badge: 'COMMUNITY ENGAGEMENT DIAGNOSTIC',
    landingTitle: 'Does your community\nneed a source of truth?',
    landingSubhead: '7 questions. 3 minutes. Find out if LBKH Liaison can give your community real, verified answers — and close the information gap between residents and decision-makers.',
    pills: ['Neighborhood Associations', 'Environmental Advocacy', 'Civic Groups', 'Resident Coalitions'],
    strongTitle: 'Your community is ready for a source-locked answer system.',
    possibleTitle: 'The platform can work for your community.',
    strongBody: "Your community is navigating exactly the kind of information asymmetry the Liaison is designed to address. When residents can get verified, source-locked answers 24/7 — not rumors, not spin — the entire dynamic of public engagement shifts. We'd like to show you what that looks like for your specific situation.",
    possibleBody: "Your community's situation has real alignment with what the Liaison does. A brief conversation will clarify how the platform can be configured to serve your residents and close the information gap you're dealing with.",
    formTitle: { strong: 'Talk to a Community Solutions Specialist →', possible: 'Talk to a Community Solutions Specialist →' },
    formSub: {
      strong: "We'll walk through how the Liaison can be configured to serve your community's specific information needs.",
      possible: "We'll discuss your community's situation and what a deployment would look like for your specific context.",
    },
    submitLabel: { strong: 'Connect With Our Team →', possible: 'Connect With Our Team →' },
    tyBody: {
      strong: "We'll reach out within one business day to discuss how the Liaison can serve your community. We'll focus on the public-facing Q&A experience and how residents interact with the system.",
      possible: "We'll reach out within one business day to talk through your community's specific needs and what a configured deployment would look like.",
    },
    webhookOutcome: { strong: 'community_strong_fit', possible: 'community_possible_fit' },
  },
};

// ─── QUESTION BANK ────────────────────────────────────────────────────────────
// Q1 is universal (audience detection). Q2 branches by audience. Q3–Q7 are universal with audience-aware copy.

const Q1 = {
  id: 1,
  universal: true,
  question: "First — who are you in this process?",
  answers: [
    { id: 'q1_private',   text: 'A private company or developer seeking community or regulatory approval',  audience: AUDIENCE.private,   fitScore: 4 },
    { id: 'q1_municipal', text: 'A city or municipal government managing public engagement and approvals',   audience: AUDIENCE.municipal, fitScore: 4 },
    { id: 'q1_state',     text: 'A state agency or regulatory body overseeing public comment and review',    audience: AUDIENCE.state,     fitScore: 4 },
    { id: 'q1_community', text: 'A community organization or advocacy group representing residents',         audience: AUDIENCE.community, fitScore: 3 },
  ],
};

const Q2_BY_AUDIENCE = {
  [AUDIENCE.private]: {
    id: 2,
    question: "What best describes your project?",
    answers: [
      { id: 'q2p_ai',         text: 'AI infrastructure / data center',                fitScore: 4 },
      { id: 'q2p_renewable',  text: 'Renewable energy (solar, wind, hydro)',           fitScore: 4 },
      { id: 'q2p_mfg',        text: 'Advanced manufacturing or industrial campus',     fitScore: 3 },
      { id: 'q2p_extraction', text: 'Resource extraction or processing',               fitScore: 2 },
      { id: 'q2p_other',      text: 'Other industrial / infrastructure development',   fitScore: 3 },
    ],
  },
  [AUDIENCE.municipal]: {
    id: 2,
    question: "What's your biggest public engagement challenge right now?",
    answers: [
      { id: 'q2m_volume',    text: 'Staff is overwhelmed answering the same questions repeatedly',                    fitScore: 4 },
      { id: 'q2m_meetings',  text: 'Public meetings get derailed and residents leave feeling unheard',                fitScore: 4 },
      { id: 'q2m_misinfo',   text: 'Misinformation about city projects spreads faster than official communications',  fitScore: 4 },
      { id: 'q2m_approval',  text: 'Public approval processes are slow because residents don\'t have clear answers',  fitScore: 3 },
      { id: 'q2m_record',    text: 'We need a better record of public participation for regulatory compliance',       fitScore: 3 },
    ],
  },
  [AUDIENCE.state]: {
    id: 2,
    question: "What's your primary public participation challenge?",
    answers: [
      { id: 'q2s_volume',    text: 'Managing high volumes of public comments and information requests',               fitScore: 4 },
      { id: 'q2s_record',    text: 'Creating a defensible, audit-ready record of public participation',               fitScore: 4 },
      { id: 'q2s_misinfo',   text: 'Correcting misinformation during active comment periods',                         fitScore: 4 },
      { id: 'q2s_access',    text: 'Ensuring equitable public access to complex regulatory documents',                fitScore: 3 },
      { id: 'q2s_hearings',  text: 'Managing information flow during public hearings and review sessions',            fitScore: 3 },
    ],
  },
  [AUDIENCE.community]: {
    id: 2,
    question: "What's the core information problem your community is facing?",
    answers: [
      { id: 'q2c_asymmetry', text: 'Residents can\'t get straight answers — information is buried or inaccessible',  fitScore: 4 },
      { id: 'q2c_misinfo',   text: 'Misinformation is spreading and residents don\'t know what to trust',            fitScore: 4 },
      { id: 'q2c_unheard',   text: 'Residents feel their questions and concerns aren\'t being addressed',            fitScore: 4 },
      { id: 'q2c_meetings',  text: 'Public meetings don\'t give residents enough time or information to engage',     fitScore: 3 },
      { id: 'q2c_oversight', text: 'We need better tools to hold developers or agencies accountable',                fitScore: 3 },
    ],
  },
};

// Universal questions Q3–Q7 with audience-aware copy
const getUniversalQuestions = (audience) => {
  const isPublic = audience === AUDIENCE.municipal || audience === AUDIENCE.state;
  const isCommunity = audience === AUDIENCE.community;

  return [
    {
      id: 3,
      question: isPublic
        ? "How does your department currently handle public information requests?"
        : isCommunity
        ? "How does your community currently get information about the project or issue?"
        : "When it comes to sharing project data with the public, your team's instinct is to...",
      answers: isPublic ? [
        { id: 'q3_pub_open',      text: 'We publish everything we can — but residents still can\'t find it easily',   fitScore: 4 },
        { id: 'q3_pub_selective', text: 'We share selectively — some information is sensitive or legally restricted',  fitScore: 3 },
        { id: 'q3_pub_reactive',  text: 'We respond to requests as they come in — it\'s reactive and time-consuming', fitScore: 4 },
        { id: 'q3_pub_unsure',    text: 'We don\'t have a consistent process',                                         fitScore: 3 },
      ] : isCommunity ? [
        { id: 'q3_com_official',  text: 'Official city/agency websites — but they\'re hard to navigate',              fitScore: 4 },
        { id: 'q3_com_social',    text: 'Social media and community groups — accuracy varies widely',                  fitScore: 4 },
        { id: 'q3_com_meetings',  text: 'Public meetings — but not everyone can attend',                               fitScore: 4 },
        { id: 'q3_com_none',      text: 'There\'s no reliable source — that\'s the problem',                          fitScore: 4 },
      ] : [
        { id: 'q3_prv_open',      text: 'Share everything we can — verified data builds trust faster than silence',    fitScore: 4 },
        { id: 'q3_prv_selective', text: 'Share selectively — some things are sensitive but we want to be transparent', fitScore: 3 },
        { id: 'q3_prv_legal',     text: 'Share only what\'s legally required',                                         fitScore: 2 },
        { id: 'q3_prv_unsure',    text: 'We haven\'t thought about it yet',                                            fitScore: 2 },
      ],
    },
    {
      id: 4,
      question: isPublic
        ? "Does your process involve public meetings, hearings, or comment periods?"
        : isCommunity
        ? "Has your community had negative experiences with similar projects or decisions in the past?"
        : "Is your project entering a community that has had negative experiences with similar developments?",
      answers: isPublic ? [
        { id: 'q4_pub_multiple', text: 'Yes — multiple, and managing them consistently is a real challenge',           fitScore: 4 },
        { id: 'q4_pub_one',      text: 'Yes — at least one major hearing or comment period is coming up',              fitScore: 4 },
        { id: 'q4_pub_maybe',    text: 'Possibly — we\'re not sure what the process will require',                     fitScore: 3 },
        { id: 'q4_pub_no',       text: 'No — our engagement is primarily digital or written',                          fitScore: 3 },
      ] : isCommunity ? [
        { id: 'q4_com_specific', text: 'Yes — there are specific past projects the community compares this to',        fitScore: 4 },
        { id: 'q4_com_general',  text: 'Yes — there\'s general distrust of developers or agencies in this area',       fitScore: 4 },
        { id: 'q4_com_new',      text: 'Not that we know of — this is relatively new territory',                       fitScore: 3 },
        { id: 'q4_com_none',     text: 'No — the community is generally open to the process',                          fitScore: 3 },
      ] : [
        { id: 'q4_prv_specific', text: 'Yes — there are specific past projects the community compares us to',          fitScore: 4 },
        { id: 'q4_prv_general',  text: 'Yes — there\'s general distrust of industrial development in this area',       fitScore: 4 },
        { id: 'q4_prv_new',      text: 'Not that we know of — this is relatively new territory for the community',     fitScore: 3 },
        { id: 'q4_prv_support',  text: 'No — the community is generally supportive of development',                    fitScore: 3 },
      ],
    },
    {
      id: 5,
      question: isPublic
        ? "What happens when residents ask questions your staff can't immediately answer?"
        : isCommunity
        ? "When residents ask questions about the project, what usually happens?"
        : "What's your biggest concern about how information about your project spreads?",
      answers: isPublic ? [
        { id: 'q5_pub_delay',    text: 'They\'re told to wait — which erodes trust and generates follow-up complaints', fitScore: 4 },
        { id: 'q5_pub_refer',    text: 'They\'re referred to documents or websites they can\'t easily navigate',        fitScore: 4 },
        { id: 'q5_pub_guess',    text: 'Staff sometimes answers from memory — inconsistently',                          fitScore: 4 },
        { id: 'q5_pub_ok',       text: 'We have a process that works — but it\'s slow and resource-intensive',         fitScore: 3 },
      ] : isCommunity ? [
        { id: 'q5_com_silence',  text: 'They don\'t get answers — or they get vague non-answers',                      fitScore: 4 },
        { id: 'q5_com_delay',    text: 'They\'re told to wait for the next public meeting',                             fitScore: 4 },
        { id: 'q5_com_docs',     text: 'They\'re pointed to documents that are hard to understand',                    fitScore: 4 },
        { id: 'q5_com_varies',   text: 'It varies — some questions get answered, others don\'t',                       fitScore: 3 },
      ] : [
        { id: 'q5_prv_misinfo',  text: 'Misinformation spreading before we can respond',                               fitScore: 4 },
        { id: 'q5_prv_unofficial','text': 'Community members getting answers from unofficial sources',                  fitScore: 4 },
        { id: 'q5_prv_meetings', text: 'Public meetings getting derailed by objections we can\'t address in real time', fitScore: 4 },
        { id: 'q5_prv_notrack',  text: 'We don\'t have a system to track what questions are being asked',              fitScore: 3 },
      ],
    },
    {
      id: 6,
      question: isPublic
        ? "How important is it that residents feel their specific questions were heard and addressed?"
        : isCommunity
        ? "How important is it to your community that questions are answered with verifiable sources?"
        : "How would you describe your project's relationship with the surrounding community right now?",
      answers: isPublic ? [
        { id: 'q6_pub_critical', text: 'Critical — it\'s a legal and political requirement for our approval process',  fitScore: 4 },
        { id: 'q6_pub_very',     text: 'Very important — unaddressed concerns become opposition',                       fitScore: 4 },
        { id: 'q6_pub_somewhat', text: 'Somewhat — we try but don\'t have a systematic way to track it',               fitScore: 3 },
        { id: 'q6_pub_low',      text: 'It\'s not currently a priority in our process',                                fitScore: 2 },
      ] : isCommunity ? [
        { id: 'q6_com_critical', text: 'Critical — we\'ve been burned by misinformation and need verifiable facts',    fitScore: 4 },
        { id: 'q6_com_very',     text: 'Very important — residents need to trust the source, not just the answer',     fitScore: 4 },
        { id: 'q6_com_somewhat', text: 'Somewhat — accuracy matters but accessibility matters more',                   fitScore: 3 },
        { id: 'q6_com_low',      text: 'Not a priority — we just need answers, whatever the source',                   fitScore: 2 },
      ] : [
        { id: 'q6_prv_proactive','text': 'We haven\'t engaged yet — we want to get ahead of concerns',                 fitScore: 4 },
        { id: 'q6_prv_early',    text: 'Early conversations — there\'s uncertainty and questions',                     fitScore: 3 },
        { id: 'q6_prv_opposition','text': 'Active opposition — we need to address it with real data',                  fitScore: 4 },
        { id: 'q6_prv_permits',  text: 'Community hasn\'t been a priority — we\'re focused on permits',               fitScore: 2 },
      ],
    },
    {
      id: 7,
      question: isPublic
        ? "Where are you in the process right now?"
        : isCommunity
        ? "Where is the project or issue in its timeline?"
        : "Where are you in the development timeline?",
      answers: isPublic ? [
        { id: 'q7_pub_pre',      text: 'Pre-announcement — we want to get ahead of the narrative',                     fitScore: 4 },
        { id: 'q7_pub_early',    text: 'Early process — public engagement is starting now',                            fitScore: 4 },
        { id: 'q7_pub_mid',      text: 'Mid-process — we\'re already in it and need to improve our approach',          fitScore: 3 },
        { id: 'q7_pub_future',   text: 'Planning for future projects or processes',                                    fitScore: 2 },
      ] : isCommunity ? [
        { id: 'q7_com_early',    text: 'Early — the project has just been announced and we\'re organizing',            fitScore: 4 },
        { id: 'q7_com_mid',      text: 'Mid-process — there are active hearings or comment periods',                   fitScore: 4 },
        { id: 'q7_com_late',     text: 'Late — a decision is imminent and we need to act fast',                        fitScore: 3 },
        { id: 'q7_com_ongoing',  text: 'Ongoing — this is a long-term engagement issue',                               fitScore: 3 },
      ] : [
        { id: 'q7_prv_pre',      text: 'Pre-announcement — get ahead of the narrative before anything goes public',    fitScore: 4 },
        { id: 'q7_prv_early',    text: 'Early permitting — community engagement is starting now',                      fitScore: 4 },
        { id: 'q7_prv_mid',      text: 'Mid-process — already in it and need to course-correct',                       fitScore: 3 },
        { id: 'q7_prv_future',   text: 'Exploring options for future projects',                                        fitScore: 2 },
      ],
    },
  ];
};

// ─── IMPROVEMENT AREAS ────────────────────────────────────────────────────────

const improvementAreas = {
  // Private company
  q2p_ai:         { category: 'Project Positioning', title: 'AI infrastructure faces the fastest-growing trust deficit', problem: 'Data centers face water, noise, and power concerns that communities are increasingly vocal about. The data almost always tells a better story than the rumors.', firstStep: 'Prepare a closed-loop cooling comparison document for the Benchmark Silo — it\'s your most powerful de-escalation tool.', urgency: 'high' },
  q2p_renewable:  { category: 'Project Positioning', title: 'Renewable projects win on values but lose on specifics', problem: 'Communities support clean energy in principle but object to specific impacts. Source-locked specifics close that gap.', firstStep: 'Upload your site-specific impact studies so the Liaison can answer "but what about OUR area?" with real data.', urgency: 'medium' },
  q2p_mfg:        { category: 'Project Positioning', title: 'Manufacturing projects need a jobs-first narrative backed by data', problem: 'Industrial campuses often lead with economic benefit but underinvest in environmental and traffic data — which is what communities actually ask about.', firstStep: 'Prepare a traffic impact comparison and noise study for the Source Silo.', urgency: 'medium' },
  q2p_extraction: { category: 'Project Positioning', title: 'Extraction projects face the steepest trust deficit', problem: 'Resource extraction carries decades of negative community associations. Without a proactive data strategy, you\'re fighting perception before the first shovel hits the ground.', firstStep: 'Load your environmental impact data and regulatory filings into the Source Silo before any public announcement.', urgency: 'high' },
  q2p_other:      { category: 'Project Positioning', title: 'Undefined project types need a clear community story fast', problem: 'If your project doesn\'t fit a familiar category, communities fill the gap with their worst assumptions.', firstStep: 'Start with a plain-language project summary document — let the Liaison answer "what actually is this?"', urgency: 'medium' },
  q3_prv_legal:   { category: 'Data Strategy', title: 'Legal minimums invite maximum suspicion', problem: 'Communities interpret legal-minimum disclosure as hiding something. The Liaison lets you share more without creating legal exposure — cited snippets, not full documents.', firstStep: 'Work with your legal team to identify which additional data points can be shared safely.', urgency: 'high' },
  q3_prv_unsure:  { category: 'Data Strategy', title: 'A transparency strategy is the first thing to define', problem: 'Without a clear data-sharing posture, your team will make inconsistent decisions under pressure — usually too little, too late.', firstStep: 'Use the LBKH onboarding call to define your transparency tiers before uploading any documents.', urgency: 'high' },
  q4_prv_specific:{ category: 'Contrast Strategy', title: 'Named past projects are your most powerful reframe opportunity', problem: 'When a community says "we don\'t want another [Project X]", that\'s an opening. The Benchmark Silo lets you show exactly why this project is different.', firstStep: 'Load documentation from the specific past project being cited and configure Benchmark Mode.', urgency: 'high' },
  q4_prv_general: { category: 'Contrast Strategy', title: 'General distrust requires a general contrast', problem: 'The most effective reframe is: "what would be built here if not this?" The Benchmark Silo makes that case with data.', firstStep: 'Prepare a zoning alternatives document showing the realistic alternative land uses.', urgency: 'high' },
  q5_prv_misinfo: { category: 'Narrative Control', title: 'Misinformation spreads fastest in the absence of a single source of truth', problem: 'Without a source-locked Liaison, every rumor has equal standing with your official data.', firstStep: 'Get the Liaison live before your next media mention — even in Coming Soon mode with a basic FAQ.', urgency: 'high' },
  q5_prv_meetings:{ category: 'Live Event Readiness', title: 'Real-time data access changes the dynamic of a public meeting', problem: 'Public meetings derail when executives can\'t answer specific technical questions on the spot. The Liaison\'s live event mode gives your team instant access to cited answers.', firstStep: 'Test the Live Event mode before your next public meeting.', urgency: 'high' },
  q6_prv_opposition:{ category: 'Community Strategy', title: 'Active opposition requires contrast data, not just defense', problem: 'Defending against objections without showing the alternative keeps you on the back foot.', firstStep: 'Load documentation from the specific past projects being used against you into the Benchmark Silo.', urgency: 'high' },
  q6_prv_permits: { category: 'Community Strategy', title: 'Permit-focused projects are most vulnerable to late-stage opposition', problem: 'Projects that skip community engagement during permitting often face organized opposition at the final approval stage — when it\'s most costly to address.', firstStep: 'Schedule a community engagement kickoff before your next permit milestone.', urgency: 'high' },
  q7_prv_pre:     { category: 'Launch Timing', title: 'Pre-announcement is the highest-leverage deployment window', problem: 'The 48 hours after a public announcement are when misinformation moves fastest. Deploy before the news breaks.', firstStep: 'Target Liaison deployment 1 week before your public announcement date.', urgency: 'high' },
  q7_prv_mid:     { category: 'Launch Timing', title: 'Mid-process deployment is harder but still decisive', problem: 'Established opposition is harder to shift than emerging uncertainty — but source-locked data still outperforms press releases.', firstStep: 'Prioritize loading the documents that address your most active objections first.', urgency: 'high' },

  // Municipal
  q2m_volume:     { category: 'Staff Efficiency', title: 'Repetitive questions are the most expensive drain on public staff', problem: 'When the same 20 questions get asked 200 times, your team is spending hours on answers that could be automated with verified data.', firstStep: 'Identify your top 10 most-asked questions and make sure those answers are in the Source Silo on day one.', urgency: 'high' },
  q2m_meetings:   { category: 'Meeting Quality', title: 'Meetings that derail signal an information gap, not a people problem', problem: 'When residents arrive at public meetings without access to clear information, they arrive with anxiety and suspicion. The Liaison closes that gap before they walk in the door.', firstStep: 'Deploy the Liaison in advance of your next public meeting and share the link in the meeting notice.', urgency: 'high' },
  q2m_misinfo:    { category: 'Narrative Control', title: 'Official communications lose to social media when they\'re harder to access', problem: 'Misinformation doesn\'t win because it\'s more convincing — it wins because it\'s easier to find. A source-locked Liaison is always available, always accurate.', firstStep: 'Deploy the Liaison as the single authoritative source and link it from every official communication.', urgency: 'high' },
  q2m_approval:   { category: 'Process Efficiency', title: 'Slow approvals are almost always an information problem', problem: 'When residents don\'t have clear answers, they object. When they object, approvals slow. The Liaison addresses the root cause, not the symptom.', firstStep: 'Map the most common objections in your last approval process and load the answers into the Source Silo.', urgency: 'high' },
  q2m_record:     { category: 'Compliance & Record', title: 'A source-locked Q&A system is also an audit-ready participation record', problem: 'Every question asked and answered through the Liaison is logged with a citation. That\'s a defensible record of public participation.', firstStep: 'Ask your legal team what documentation standards apply to your public participation process.', urgency: 'medium' },
  q3_pub_reactive:{ category: 'Staff Efficiency', title: 'Reactive information handling creates a bottleneck at the worst times', problem: 'When public interest peaks — during an announcement or controversy — reactive processes collapse under volume.', firstStep: 'Configure the Liaison to handle your top 20 information requests automatically, freeing staff for complex cases.', urgency: 'high' },
  q4_pub_multiple:{ category: 'Meeting Consistency', title: 'Multiple meetings require a consistent information baseline', problem: 'Each meeting is a new opportunity for inconsistent answers to create contradictions in the public record.', firstStep: 'Deploy the Liaison as the consistent source across all meetings — every answer cites the same documents.', urgency: 'high' },
  q5_pub_guess:   { category: 'Answer Quality', title: 'Memory-based answers create liability and erode trust', problem: 'When staff answers from memory, inconsistencies become the story. Source-locked answers are always consistent and always citable.', firstStep: 'Run a practice session with your team using the Liaison before the next public meeting.', urgency: 'high' },
  q6_pub_critical:{ category: 'Public Participation', title: 'Documented response to every question is your strongest legal protection', problem: 'If public participation is a legal requirement, the Liaison\'s audit trail is your evidence that every voice was heard and addressed.', firstStep: 'Configure the Liaison to log every question and export a participation report after each comment period.', urgency: 'high' },
  q6_pub_low:     { category: 'Public Trust', title: 'Deprioritizing resident voices creates the opposition you\'re trying to avoid', problem: 'Residents who feel unheard don\'t go away — they organize. The Liaison is the lowest-cost way to make every resident feel heard.', firstStep: 'Start with a pilot on your next project and measure the change in meeting tone.', urgency: 'high' },
  q7_pub_pre:     { category: 'Launch Timing', title: 'Pre-announcement deployment sets the information standard before opposition forms', problem: 'The first week after an announcement is when misinformation moves fastest. Deploy the Liaison before the news breaks.', firstStep: 'Target Liaison deployment 1 week before your public announcement.', urgency: 'high' },
  q7_pub_mid:     { category: 'Launch Timing', title: 'Mid-process deployment resets the information baseline', problem: 'Even with established objections, a source-locked system shifts the conversation from opinion to evidence.', firstStep: 'Prioritize loading the documents that address your most active objections first.', urgency: 'high' },

  // State
  q2s_volume:     { category: 'Capacity Management', title: 'High-volume comment periods require automated first-response', problem: 'When comment volumes spike, manual processing creates backlogs that delay review timelines and frustrate the public.', firstStep: 'Configure the Liaison to handle tier-1 information requests automatically, routing complex cases to staff.', urgency: 'high' },
  q2s_record:     { category: 'Compliance & Record', title: 'A source-locked system is an audit-ready participation record by design', problem: 'Every question and answer is logged with a citation to the source document. That\'s a defensible record of public participation.', firstStep: 'Define your documentation standards before configuring the Liaison so the export format matches your requirements.', urgency: 'high' },
  q2s_misinfo:    { category: 'Narrative Control', title: 'Correcting misinformation during active comment periods requires a faster channel', problem: 'Press releases and website updates are too slow. A source-locked Liaison is always available and always accurate.', firstStep: 'Deploy the Liaison as the official information channel and link it from all agency communications during the comment period.', urgency: 'high' },
  q2s_access:     { category: 'Equitable Access', title: 'Complex regulatory documents are inaccessible to most residents by design', problem: 'When only lawyers and engineers can understand the documents, public participation is structurally limited.', firstStep: 'Load your regulatory documents and configure the Liaison to translate technical language into plain English.', urgency: 'high' },
  q2s_hearings:   { category: 'Hearing Management', title: 'Hearings without a real-time information system create inconsistent records', problem: 'When hearing officers answer from memory, inconsistencies become grounds for challenge.', firstStep: 'Test the Live Event mode before your next hearing — source-locked answers in real time.', urgency: 'high' },

  // Community
  q2c_asymmetry:  { category: 'Information Access', title: 'Information asymmetry is the root cause of most community opposition', problem: 'When residents can\'t access the same information as developers and agencies, they can\'t participate meaningfully in the process.', firstStep: 'Identify the 5 most important documents residents need access to and make sure they\'re in the Source Silo.', urgency: 'high' },
  q2c_misinfo:    { category: 'Information Integrity', title: 'A source-locked system is the only reliable counter to misinformation', problem: 'You can\'t fight misinformation with more assertions. You need a system that cites its sources so residents can verify for themselves.', firstStep: 'Load the official project documents and configure the Liaison to cite every answer with a source link.', urgency: 'high' },
  q2c_unheard:    { category: 'Community Voice', title: 'Feeling unheard is the fastest path to organized opposition', problem: 'When residents can\'t get answers, they assume the worst and organize around that assumption. A source-locked Liaison closes the gap.', firstStep: 'Deploy the Liaison as a community-controlled information resource and share it widely before the next public meeting.', urgency: 'high' },
  q2c_meetings:   { category: 'Meeting Access', title: 'Public meetings exclude the residents who can\'t attend', problem: 'When public meetings are the only venue for information, residents who work nights, have children, or lack transportation are structurally excluded.', firstStep: 'Deploy the Liaison as a 24/7 alternative to public meetings — same information, always available.', urgency: 'high' },
  q2c_oversight:  { category: 'Accountability', title: 'Source-locked citations create an accountability trail', problem: 'When every answer cites a specific document, it\'s harder for developers or agencies to walk back commitments.', firstStep: 'Configure the Liaison to log all questions and answers so you have a record of what was said and when.', urgency: 'medium' },
  q4_com_specific:{ category: 'Contrast Strategy', title: 'Named past projects are your most powerful advocacy tool', problem: 'When your community says "we\'ve seen this before," you need data to show exactly how this project compares — or doesn\'t.', firstStep: 'Load documentation from the specific past project being cited into the Benchmark Silo.', urgency: 'high' },
  q4_com_general: { category: 'Trust Deficit', title: 'General distrust requires a general counter-narrative', problem: 'When there\'s no specific project to compare against, the most effective approach is showing what good looks like.', firstStep: 'Load best-practice examples from comparable projects that delivered on their community commitments.', urgency: 'high' },
  q5_com_silence: { category: 'Information Gap', title: 'Silence from officials is the most powerful recruitment tool for opposition', problem: 'When residents can\'t get answers through official channels, they find unofficial ones — and those answers are rarely accurate.', firstStep: 'Deploy the Liaison as the community\'s go-to source and promote it as an alternative to waiting for official responses.', urgency: 'high' },
  q6_com_critical:{ category: 'Source Verification', title: 'Verifiable sources are the foundation of community trust', problem: 'In a high-distrust environment, "trust us" doesn\'t work. Source-locked citations let residents verify every answer independently.', firstStep: 'Configure every answer to include a citation link to the source document or public filing.', urgency: 'high' },
  q7_com_late:    { category: 'Urgency', title: 'Late-stage deployment requires prioritization', problem: 'When a decision is imminent, you don\'t have time to load everything. Focus on the documents that address the most active objections.', firstStep: 'Identify the 3 most contested claims and make sure those answers are in the Source Silo first.', urgency: 'high' },
};

const MAX_SCORE = 28;
const STRONG_FIT_THRESHOLD = 22;
const urgencyColor = { high: '#40E0D0', medium: '#00A8A8', low: '#4b5563' };
const urgencyLabel  = { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority' };

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function QuizFunnel() {
  const navigate = useNavigate();
  const [stage, setStage]       = useState('landing');
  const [audience, setAudience] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers]   = useState({});
  const [score, setScore]       = useState(0);
  const [isStrongFit, setIsStrongFit] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', company: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [topAreas, setTopAreas] = useState([]);

  useEffect(() => {
    if (stage === 'calculating') {
      const t = setTimeout(() => setStage('results'), 2800);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleAnswer = (answerId, fitScore, answerAudience) => {
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q.id]: answerId };
    setAnswers(newAnswers);

    // Q1 — detect audience and build question list
    if (q.id === 1 && answerAudience) {
      const aud = answerAudience;
      setAudience(aud);
      const builtQuestions = [Q1, Q2_BY_AUDIENCE[aud], ...getUniversalQuestions(aud)];
      setQuestions(builtQuestions);
      setTimeout(() => setCurrentQ(1), 280);
      return;
    }

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 280);
    } else {
      // Final — tally
      const total = questions.reduce((sum, q) => {
        const aid = newAnswers[q.id];
        const ans = q.answers.find(a => a.id === aid);
        return sum + (ans ? ans.fitScore : 0);
      }, 0);
      setScore(total);
      const strong = total >= STRONG_FIT_THRESHOLD;
      setIsStrongFit(strong);

      const areas = Object.entries(newAnswers)
        .map(([, aId]) => {
          const area = improvementAreas[aId];
          if (!area) return null;
          const ans = questions.flatMap(q => q.answers).find(a => a.id === aId);
          return { ...area, painScore: ans?.fitScore || 0 };
        })
        .filter(Boolean)
        .sort((a, b) => {
          const ord = { high: 3, medium: 2, low: 1 };
          if (b.painScore !== a.painScore) return b.painScore - a.painScore;
          return ord[b.urgency] - ord[a.urgency];
        })
        .slice(0, 3);
      setTopAreas(areas);
      setStage('calculating');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const meta = audienceMeta[audience] || audienceMeta[AUDIENCE.private];
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/fkyVaCUPjbDUBzUopuLP/webhook-trigger/4f5119bb-d5f7-4383-87ed-9f24b8e9408e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          score,
          audience: (audience === AUDIENCE.private || audience === AUDIENCE.state) ? 'Corporate' : 'Public',
          audience_detail: audience,
          outcome: isStrongFit ? meta.webhookOutcome.strong : meta.webhookOutcome.possible,
          answers,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setStage('thankyou'), 600);
    }
  };

  const meta = audienceMeta[audience] || audienceMeta[AUDIENCE.private];
  const progress = questions.length > 0 ? ((currentQ + 1) / questions.length) * 100 : 0;

  // ─── LANDING ──────────────────────────────────────────────────────────────
  if (stage === 'landing') {
    // On landing we show Q1 directly (no separate landing screen needed)
    const q = Q1;
    return (
      <div style={s.page}>
        <button onClick={() => navigate(-1)} style={s.backBtn}>← Back</button>
        <div style={s.landingTop}>
          <div style={s.badge}>LBKH LIAISON — PROJECT FIT DIAGNOSTIC</div>
          <h1 style={s.h1}>Is LBKH Liaison<br />right for you?</h1>
          <p style={s.subhead}>Answer 7 quick questions and find out if the platform fits your situation — and what it would take to go live.</p>
        </div>
        <div style={s.quizCard}>
          <div style={s.qCounter}>Question 1 / 7</div>
          <h2 style={s.qText}>{q.question}</h2>
          <div style={s.answerGrid}>
            {q.answers.map(a => (
              <button
                key={a.id}
                onClick={() => {
                  setStage('quiz');
                  handleAnswer(a.id, a.fitScore, a.audience);
                }}
                style={s.answerBtn}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#40E0D0'; e.currentTarget.style.background = 'rgba(64,224,208,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                {a.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (stage === 'quiz') {
    const q = questions[currentQ];
    if (!q) return null;
    return (
      <div style={s.page}>
        <button onClick={() => navigate(-1)} style={s.backBtn}>← Back</button>
        <div style={{ ...s.quizCard, marginTop: '0' }}>
          <div style={s.progressWrap}>
            <div style={{ ...s.progressBar, width: `${progress}%` }} />
          </div>
          <div style={s.qCounter}>{currentQ + 1} / {questions.length}</div>
          <h2 style={s.qText}>{q.question}</h2>
          <div style={s.answerGrid}>
            {q.answers.map(a => (
              <button
                key={a.id}
                onClick={() => handleAnswer(a.id, a.fitScore, a.audience)}
                style={s.answerBtn}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#40E0D0'; e.currentTarget.style.background = 'rgba(64,224,208,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                {a.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── CALCULATING ──────────────────────────────────────────────────────────
  if (stage === 'calculating') return (
    <div style={s.page}>
      <div style={s.calcCard}>
        <div style={s.spinner} />
        <p style={s.calcText}>Analyzing your situation...</p>
        <div style={s.calcDots}>
          {['Evaluating engagement context', 'Assessing information needs', 'Mapping deployment path'].map((t, i) => (
            <div key={t} style={{ ...s.calcDot, opacity: 0.6, animation: `fadeIn 0.5s ease ${i * 0.4}s forwards` }}>
              <span style={s.calcDotIcon}>◆</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── RESULTS ──────────────────────────────────────────────────────────────
  if (stage === 'results') return (
    <div style={s.page}>
      <div style={s.resultsCard}>
        <div style={s.scoreReveal}>
          <div style={s.scoreBadge}>
            <span style={s.scoreNum}>{score}</span>
            <span style={s.scoreMax}>/ {MAX_SCORE}</span>
          </div>
          <div style={{ ...s.outcomeTag, background: isStrongFit ? 'rgba(64,224,208,0.15)' : 'rgba(0,168,168,0.12)', borderColor: isStrongFit ? '#40E0D0' : '#00A8A8' }}>
            {isStrongFit ? '✓ STRONG FIT' : '◎ POSSIBLE FIT'}
          </div>
        </div>

        <h2 style={s.resultsH2}>{isStrongFit ? meta.strongTitle : meta.possibleTitle}</h2>
        <p style={s.resultsBody}>{isStrongFit ? meta.strongBody : meta.possibleBody}</p>

        <div style={s.featureGrid}>
          {[
            { icon: '🔒', title: 'Source-Locked Truth Engine', desc: 'Every answer grounded in verified documents. No hallucinations, no liability.' },
            { icon: '⚡', title: '24-Hour Deployment', desc: 'Upload your documents, configure branding, go live. The 48-hour launch protocol is built in.' },
            { icon: '📊', title: 'Benchmark Contrast Mode', desc: 'Load documentation from comparable projects. Let the data make the case.' },
            { icon: '🎤', title: 'Live Event Mode', desc: 'Real-time source-locked Q&A for public meetings, hearings, and comment sessions.' },
          ].map(f => (
            <div key={f.title} style={s.featureCard}>
              <div style={s.featureIcon}>{f.icon}</div>
              <div>
                <div style={s.featureTitle}>{f.title}</div>
                <div style={s.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <form onSubmit={handleFormSubmit} style={s.form}>
            <h3 style={s.formH3}>{isStrongFit ? meta.formTitle.strong : meta.formTitle.possible}</h3>
            <p style={s.formSub}>{isStrongFit ? meta.formSub.strong : meta.formSub.possible}</p>
            <div style={s.formGrid}>
              <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={s.input} />
              <input required type="email" placeholder="Work Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={s.input} />
              <input required placeholder="Organization / Project Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={s.input} />
              <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={s.input} />
            </div>
            <button type="submit" disabled={submitting} style={s.submitBtn}>
              {submitting ? 'Sending...' : isStrongFit ? meta.submitLabel.strong : meta.submitLabel.possible}
            </button>
            <p style={s.formDisclaimer}>No spam. No pressure. Just a real conversation.</p>
            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <a
                href="https://lbkh-liason.pages.dev"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', letterSpacing: '0.05em', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1px' }}
              >
                Skip — go straight to the demo →
              </a>
            </div>
          </form>
        ) : (
          <div style={s.successMsg}>✓ Received — we'll be in touch within one business day.</div>
        )}
      </div>
    </div>
  );

  // ─── THANK YOU ────────────────────────────────────────────────────────────
  if (stage === 'thankyou') return (
    <div style={s.page}>
      <div style={s.tyCard}>
        <div style={s.tyCheck}>✓</div>
        <h2 style={s.tyH2}>You're on the list.</h2>
        <p style={s.tyBody}>{isStrongFit ? meta.tyBody.strong : meta.tyBody.possible}</p>
        <a href="https://lbkh-liason.pages.dev" target="_blank" rel="noreferrer" style={s.demoBtn}>
          Explore the Live Demo →
        </a>

        {topAreas.length > 0 && (
          <div style={s.areasSection}>
            <h3 style={s.areasH3}>Your Top {topAreas.length} Deployment Priorities</h3>
            <p style={s.areasSub}>Based on your answers, these are the areas where the Liaison will have the most immediate impact.</p>
            <div style={s.areasGrid}>
              {topAreas.map((area, i) => (
                <div key={i} style={s.areaCard}>
                  <div style={s.areaHeader}>
                    <span style={s.areaCategory}>{area.category}</span>
                    <span style={{ ...s.urgencyBadge, background: urgencyColor[area.urgency] + '22', color: urgencyColor[area.urgency], borderColor: urgencyColor[area.urgency] + '44' }}>
                      {urgencyLabel[area.urgency]}
                    </span>
                  </div>
                  <div style={s.areaTitle}>{area.title}</div>
                  <div style={s.areaLabel}>The Problem</div>
                  <div style={s.areaText}>{area.problem}</div>
                  <div style={s.areaLabel}>First Step</div>
                  <div style={s.areaText}>{area.firstStep}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => navigate(-1)} style={s.backToPage}>
          ← Back
        </button>
      </div>
    </div>
  );

  return null;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const s = {
  page: { minHeight: '100vh', background: 'radial-gradient(circle at 50% 0%, #071a19 0%, #050505 60%)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px 80px', fontFamily: 'ui-sans-serif, system-ui, sans-serif', position: 'relative' },
  backBtn: { alignSelf: 'flex-start', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.05em', marginBottom: '32px', padding: '0', textTransform: 'uppercase' },
  landingTop: { maxWidth: '640px', width: '100%', textAlign: 'center', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' },
  badge: { background: 'rgba(64,224,208,0.1)', border: '1px solid rgba(64,224,208,0.3)', borderRadius: '4px', color: '#40E0D0', fontSize: '10px', fontWeight: '900', letterSpacing: '0.15em', padding: '6px 16px', textTransform: 'uppercase' },
  h1: { color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1.05', margin: '0', textTransform: 'uppercase' },
  subhead: { color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: '1.6', margin: '0', maxWidth: '480px' },
  quizCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(64,224,208,0.15)', borderRadius: '16px', maxWidth: '680px', padding: '40px 36px', width: '100%' },
  progressWrap: { background: 'rgba(255,255,255,0.06)', borderRadius: '100px', height: '3px', marginBottom: '28px', overflow: 'hidden', width: '100%' },
  progressBar: { background: 'linear-gradient(90deg, #40E0D0, #00A8A8)', borderRadius: '100px', height: '100%', transition: 'width 0.4s ease' },
  qCounter: { color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '14px', textTransform: 'uppercase' },
  qText: { color: '#ffffff', fontSize: 'clamp(1.05rem, 2.8vw, 1.4rem)', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: '1.3', marginBottom: '28px' },
  answerGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  answerBtn: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '14px', lineHeight: '1.4', padding: '14px 18px', textAlign: 'left', transition: 'border-color 0.15s, background 0.15s' },
  calcCard: { alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '480px', textAlign: 'center', width: '100%', marginTop: '80px' },
  spinner: { animation: 'spin 1s linear infinite', border: '2px solid rgba(64,224,208,0.15)', borderRadius: '50%', borderTopColor: '#40E0D0', height: '48px', width: '48px' },
  calcText: { color: 'rgba(255,255,255,0.6)', fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' },
  calcDots: { display: 'flex', flexDirection: 'column', gap: '12px' },
  calcDot: { color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '0.05em' },
  calcDotIcon: { color: '#40E0D0', marginRight: '8px' },
  resultsCard: { maxWidth: '760px', width: '100%', display: 'flex', flexDirection: 'column', gap: '36px' },
  scoreReveal: { alignItems: 'center', display: 'flex', gap: '20px', flexWrap: 'wrap' },
  scoreBadge: { alignItems: 'baseline', display: 'flex', gap: '4px' },
  scoreNum: { color: '#40E0D0', fontSize: '64px', fontWeight: '900', letterSpacing: '-0.04em', lineHeight: '1' },
  scoreMax: { color: 'rgba(255,255,255,0.3)', fontSize: '24px', fontWeight: '700' },
  outcomeTag: { border: '1px solid', borderRadius: '6px', fontSize: '12px', fontWeight: '900', letterSpacing: '0.1em', padding: '8px 20px', textTransform: 'uppercase', color: '#40E0D0' },
  resultsH2: { color: '#ffffff', fontSize: 'clamp(1.3rem, 3.2vw, 2rem)', fontWeight: '900', letterSpacing: '-0.03em', lineHeight: '1.15', margin: '0' },
  resultsBody: { color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.7', margin: '0' },
  featureGrid: { display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  featureCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(64,224,208,0.12)', borderRadius: '12px', display: 'flex', gap: '14px', padding: '18px' },
  featureIcon: { fontSize: '22px', flexShrink: 0 },
  featureTitle: { color: '#ffffff', fontSize: '12px', fontWeight: '800', letterSpacing: '-0.01em', marginBottom: '5px', textTransform: 'uppercase' },
  featureDesc: { color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: '1.5' },
  form: { background: 'rgba(64,224,208,0.04)', border: '1px solid rgba(64,224,208,0.2)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '18px', padding: '32px' },
  formH3: { color: '#ffffff', fontSize: '18px', fontWeight: '900', letterSpacing: '-0.02em', margin: '0', textTransform: 'uppercase' },
  formSub: { color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.6', margin: '0' },
  formGrid: { display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' },
  input: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '14px', outline: 'none', padding: '12px 16px', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: 'linear-gradient(135deg, #40E0D0, #00A8A8)', border: 'none', borderRadius: '8px', color: '#050505', cursor: 'pointer', fontSize: '13px', fontWeight: '900', letterSpacing: '0.05em', padding: '15px', textTransform: 'uppercase' },
  formDisclaimer: { color: 'rgba(255,255,255,0.2)', fontSize: '11px', letterSpacing: '0.04em', margin: '0', textAlign: 'center', textTransform: 'uppercase' },
  successMsg: { background: 'rgba(64,224,208,0.1)', border: '1px solid rgba(64,224,208,0.3)', borderRadius: '12px', color: '#40E0D0', fontSize: '14px', fontWeight: '700', letterSpacing: '0.05em', padding: '24px', textAlign: 'center', textTransform: 'uppercase' },
  tyCard: { alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '760px', textAlign: 'center', width: '100%' },
  tyCheck: { background: 'rgba(64,224,208,0.1)', border: '2px solid rgba(64,224,208,0.4)', borderRadius: '50%', color: '#40E0D0', fontSize: '28px', height: '72px', lineHeight: '72px', width: '72px' },
  tyH2: { color: '#ffffff', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', letterSpacing: '-0.03em', margin: '0', textTransform: 'uppercase' },
  tyBody: { color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', margin: '0', maxWidth: '520px' },
  demoBtn: { background: 'linear-gradient(135deg, #40E0D0, #00A8A8)', borderRadius: '8px', color: '#050505', display: 'inline-block', fontSize: '13px', fontWeight: '900', letterSpacing: '0.05em', padding: '14px 32px', textDecoration: 'none', textTransform: 'uppercase' },
  areasSection: { textAlign: 'left', width: '100%' },
  areasH3: { color: '#ffffff', fontSize: '17px', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '8px', textTransform: 'uppercase' },
  areasSub: { color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' },
  areasGrid: { display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' },
  areaCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '18px' },
  areaHeader: { alignItems: 'center', display: 'flex', gap: '10px', justifyContent: 'space-between' },
  areaCategory: { color: 'rgba(255,255,255,0.3)', fontSize: '9px', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase' },
  urgencyBadge: { border: '1px solid', borderRadius: '4px', fontSize: '9px', fontWeight: '900', letterSpacing: '0.08em', padding: '3px 8px', textTransform: 'uppercase' },
  areaTitle: { color: '#ffffff', fontSize: '13px', fontWeight: '800', letterSpacing: '-0.01em', lineHeight: '1.3' },
  areaLabel: { color: '#40E0D0', fontSize: '9px', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase' },
  areaText: { color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: '1.6' },
  backToPage: { background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.05em', padding: '12px 24px', textTransform: 'uppercase' },
};
