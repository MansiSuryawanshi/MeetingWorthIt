/**
 * Pre-built mock AI verdicts for each demo scenario.
 * Schema matches the real Anthropic API response exactly.
 */

const DEMO_VERDICTS = {
  'weekly-product-sync': {
    necessityScore: 3,
    scoreLabel: 'This Could Have Been An Email',
    keyQuestion: 'What decision or action requires all 8 people to be in the same room at the same time?',
    attendeeAnalysis: [
      { role: 'Product Manager', status: 'Essential', reason: 'Owns the sprint priorities and needs to hear blockers firsthand.' },
      { role: 'Senior Engineer', status: 'Essential', reason: 'Can unblock technical dependencies and make architecture calls.' },
      { role: 'Engineer', status: 'Optional', reason: 'Status can be shared async via standup bot or Slack thread.' },
      { role: 'Engineer', status: 'Could Receive Notes Instead', reason: 'Only reports status — no decision-making role in this meeting.' },
      { role: 'Designer', status: 'Could Receive Notes Instead', reason: 'Design updates are visual — a Loom walkthrough is more effective.' },
      { role: 'Marketing Manager', status: 'Could Receive Notes Instead', reason: 'Only needs the summary, not the sprint-level details.' },
      { role: 'Data Scientist', status: 'Could Receive Notes Instead', reason: 'Rarely has blockers that need real-time discussion.' },
      { role: 'Manager', status: 'Optional', reason: 'Could review an async summary and step in only when escalation is needed.' },
    ],
    couldBeAsync: true,
    asyncReason: 'Status updates and blocker lists are better shared in writing — people can read faster than they can listen. Only blockers needing real-time debate justify a meeting.',
    asyncFormat: 'Slack thread',
    actionableFix: 'Replace this meeting with a daily async Slack standup for status updates. Keep a 30-minute weekly sync with only PM + Senior Engineer + Manager for blockers that need live discussion.',
  },

  'incident-response': {
    necessityScore: 9,
    scoreLabel: 'Worth Every Dollar',
    keyQuestion: 'Is the production system restored and is the customer impact contained?',
    attendeeAnalysis: [
      { role: 'Senior Engineer', status: 'Essential', reason: 'Directly diagnosing and fixing the payment system issue.' },
      { role: 'Senior Engineer', status: 'Essential', reason: 'Provides backup expertise and can parallelize the investigation.' },
      { role: 'DevOps Engineer', status: 'Essential', reason: 'Owns infrastructure and deployment — needed for rollback or hotfix deploy.' },
      { role: 'Manager', status: 'Essential', reason: 'Coordinates the response, handles stakeholder communication, removes blockers.' },
      { role: 'VP / Executive', status: 'Essential', reason: 'Authorizes emergency decisions and owns the customer communication plan.' },
    ],
    couldBeAsync: false,
    asyncReason: 'A live production outage with active revenue loss requires real-time coordination. Every minute of delay costs money and customer trust.',
    asyncFormat: null,
    actionableFix: 'This meeting is fully justified. After resolution, schedule a 30-minute blameless postmortem within 48 hours to capture learnings and prevent recurrence.',
  },

  'design-review': {
    necessityScore: 6,
    scoreLabel: 'Borderline — Could Be Optimized',
    keyQuestion: 'Are we making a final design decision today, or just sharing progress?',
    attendeeAnalysis: [
      { role: 'Designer', status: 'Essential', reason: 'Presenting the work and needs direct feedback from decision-makers.' },
      { role: 'Senior Engineer', status: 'Essential', reason: 'Must validate technical feasibility of proposed designs in real-time.' },
      { role: 'Product Manager', status: 'Essential', reason: 'Owns the product requirements and makes the final call on direction.' },
      { role: 'Engineer', status: 'Optional', reason: 'Could review designs async and flag concerns in comments.' },
      { role: 'Manager', status: 'Optional', reason: 'Useful for alignment but could review the recording instead.' },
      { role: 'Marketing Manager', status: 'Could Receive Notes Instead', reason: 'Marketing input is valuable but can be collected async after the design is closer to final.' },
    ],
    couldBeAsync: true,
    asyncReason: 'The presentation portion (mockup walkthrough) could be a recorded Loom video. Only the feedback and decision-making portions require live discussion.',
    asyncFormat: 'Loom video',
    actionableFix: 'Have the designer share a Loom walkthrough 24 hours before the meeting. Cut the meeting to 45 minutes focused only on feedback and decisions. Drop attendees who only observe.',
  },
}

export default DEMO_VERDICTS
