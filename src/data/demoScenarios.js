/**
 * Demo scenario data for Try Demo mode.
 * Each scenario auto-fills the meeting form with realistic sample data.
 */

const DEMO_SCENARIOS = [
  {
    id: 'weekly-product-sync',
    emoji: '📋',
    label: 'Weekly Product Sync',
    description: 'Status updates, blockers, and sprint check-ins across the product team.',
    title: 'Weekly Product Sync',
    duration: 60,
    recurrence: 'weekly',
    agenda: '1. Go around the room — status updates from each team\n2. Review blockers and dependencies\n3. Sprint progress check\n4. Open floor for questions',
    context: 'Recurring meeting that started 8 months ago. Attendance has grown from 4 to 8 people over time. Nobody has questioned whether everyone still needs to attend.',
    attendees: [
      { role: 'Product Manager', salary: 110000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Designer', salary: 100000 },
      { role: 'Marketing Manager', salary: 95000 },
      { role: 'Data Scientist', salary: 130000 },
      { role: 'Manager', salary: 140000 },
    ],
  },
  {
    id: 'incident-response',
    emoji: '🚨',
    label: 'Incident Response Call',
    description: 'Urgent production issue requiring immediate coordination.',
    title: 'P0 Incident — Payment Processing Down',
    duration: 45,
    recurrence: 'one-time',
    agenda: '1. Confirm scope of the outage\n2. Identify root cause\n3. Assign fix owners\n4. Agree on customer communication plan',
    context: 'Payment processing has been failing for 20 minutes. Revenue impact estimated at $8K/minute. Need all hands who can diagnose and fix.',
    attendees: [
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'DevOps Engineer', salary: 125000 },
      { role: 'Manager', salary: 140000 },
      { role: 'VP / Executive', salary: 250000 },
    ],
  },
  {
    id: 'design-review',
    emoji: '🎨',
    label: 'Design Review',
    description: 'Reviewing design choices, gathering feedback, and aligning on direction.',
    title: 'Design Review — New Checkout Flow',
    duration: 90,
    recurrence: 'bi-weekly',
    agenda: '1. Designer presents updated mockups\n2. Walk through user flow changes\n3. Engineering feasibility discussion\n4. Stakeholder feedback round\n5. Decide on final direction',
    context: 'Biweekly review for the checkout redesign project. The team has been iterating for 3 sprints. Some attendees only observe and rarely contribute.',
    attendees: [
      { role: 'Designer', salary: 100000 },
      { role: 'Senior Engineer', salary: 150000 },
      { role: 'Product Manager', salary: 110000 },
      { role: 'Engineer', salary: 120000 },
      { role: 'Manager', salary: 140000 },
      { role: 'Marketing Manager', salary: 95000 },
    ],
  },
]

export default DEMO_SCENARIOS
