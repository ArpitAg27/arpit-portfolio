export const experiences = [
  {
    id: 1,
    company: 'Skit.ai',
    role: 'Software Engineer',
    type: 'Full-time',
    location: 'Bangalore, India',
    duration: 'Jan 2025 — Present',
    description: [
      'Own backend systems on a high-traffic enterprise platform covering auth, payments, and integrations. Most of the work is the quiet kind. A race condition fixed, an N+1 query gone, read traffic moved to a replica.',
      'Designed and shipped an end-to-end sanity-check system that catches production regressions before customers do. Webhook ingestion, retry logic, and automatic incident creation with enriched context. 10+ catches and counting.',
      'Built internal tooling that punches well above its weight: LLM agents for repetitive engineering chores, sprint-automation CLIs, and on-call routing that reads live schedules and pages the right person. Roughly a 4-people-do-the-work-of-6 outcome.',
      'Authored security upgrades (field-level encryption, log sanitization, MFA hardening) and contributed to the team alerting pipeline that turns noisy errors into actionable incidents.',
    ],
    tech: ['Python', 'Go', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Grafana'],
    current: true,
  },
];

export const education = [
  {
    id: 1,
    institution: 'PES University',
    degree: 'B.Tech in Computer Science',
    location: 'Bangalore',
    duration: '2021 — 2025',
    description: 'Focused on systems, distributed computing, and machine learning. A self-taught minor in backend security and observability picked up alongside the curriculum.',
    achievements: ["Distinction Award Scholarship (DAC)"],
  },
];

export const achievementsAndCerts = [
  {
    id: 'hack',
    title: 'Hackathons: multiple top-3 and top-10 finishes',
    issuer: 'State and college-level (24-hour formats, 200–300+ teams)',
  },
  {
    id: 'hr',
    title: 'Problem Solving (Intermediate)',
    issuer: 'HackerRank',
  },
  {
    id: 'pesuio',
    title: 'Machine Learning · Image Processing',
    issuer: 'PESU I/O',
  },
];
