# MeetingWorthIt — Test Scenarios

Built by Khushi Patel | USC Marshall TechFest 2026

---

## HOW TO USE THIS FILE

For each scenario below:
1. Click the matching template OR manually enter the details
2. Add the listed attendees from your Team Database
3. Fill in the Agenda and Context fields
4. Click "Analyze This Meeting →"
5. Check if the AI score matches the expected result

---

## SCENARIO 1 — Daily Standup (Should Be Async)

**Title:** Daily Team Standup
**Duration:** 15 min
**Recurrence:** Daily
**Expected Score:** 2-3/10 — This Could Have Been An Email

**Attendees:**
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Emily Watson — Engineer — $195,000
- James Liu — Engineer — $190,000
- Tyler Brooks — Engineer — $185,000
- Zoe Patel — Junior Engineer — $145,000
- Priya Sharma — Product Manager — $210,000
- Ryan Mitchell — Manager — $260,000

**Agenda:**
```
1. What did everyone work on yesterday
2. What are you working on today
3. Any blockers
```

**Context:**
```
This standup has been running for 18 months. It started as a 
10-minute sync but now runs 30-40 minutes. Nobody has an agenda. 
People repeat what they wrote in Jira the night before.
```

**Cost:** ~$198/session · ~$51,480/year
**What AI should say:** Replace with a shared async doc. Engineers
update their status in writing. Only meet when there is a real blocker.

---

## SCENARIO 2 — Production Outage (Meeting Justified)

**Title:** Production outage — payment system down
**Duration:** 1 hour
**Recurrence:** One-time
**Expected Score:** 9/10 — Worth Every Dollar

**Attendees:**
- Sarah Chen — VP / Executive — $450,000
- Marcus Johnson — Director — $320,000
- Ryan Mitchell — Manager — $260,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Emily Watson — Engineer — $195,000
- Chris Walker — Data Scientist — $240,000
- James Liu — Engineer — $190,000

**Agenda:**
```
1. Identify root cause of payment failure
2. Assign immediate fix ownership
3. Decide whether to roll back or patch forward
4. Customer communication plan
5. Post-mortem scheduling
```

**Context:**
```
Payment system has been down for 47 minutes. Estimated revenue 
loss is $12,000 per minute. Three different engineers have 
conflicting theories on root cause. VP needs to authorize 
emergency rollback. Real-time coordination required.
```

**Cost:** ~$1,340/session · one-time
**What AI should say:** 9/10. Every person is essential. Real-time
decision-making required. Cannot be async.

---

## SCENARIO 3 — Weekly Sync (Context Kills The Score)

**Title:** Weekly Engineering Sync
**Duration:** 1 hour
**Recurrence:** Weekly
**Expected Score:** 2/10 — This Could Have Been An Email

**Attendees:**
- Marcus Johnson — Director — $320,000
- Ryan Mitchell — Manager — $260,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Emily Watson — Engineer — $195,000
- James Liu — Engineer — $190,000
- Tyler Brooks — Engineer — $185,000

**Agenda:**
```
1. Team updates
2. Any blockers
3. Miscellaneous
```

**Context:**
```
This meeting has been running for 2 years. Nobody knows who 
originally scheduled it. The last 3 meetings ended with 
"let's take this offline." No decisions have ever been made 
in this meeting. Most engineers have it muted on their calendar.
```

**Cost:** ~$1,060/session · ~$55,120/year
**What AI should say:** Cancel immediately. The context proves
this meeting has never produced value. Replace with a weekly
written update in Slack.

---

## SCENARIO 4 — Build vs Buy Decision (High Stakes)

**Title:** Payment API vendor selection — build vs buy decision
**Duration:** 90 min
**Recurrence:** One-time
**Expected Score:** 9/10 — Worth Every Dollar

**Attendees:**
- Sarah Chen — VP / Executive — $450,000
- Marcus Johnson — Director — $320,000
- Rachel Kim — Director — $310,000
- Priya Sharma — Product Manager — $210,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Ryan Mitchell — Manager — $260,000

**Agenda:**
```
1. Review Stripe vs internal build cost analysis
2. Security team concerns on third-party data handling
3. Engineering capacity assessment for internal build
4. Legal review of Stripe data processing agreement
5. Final decision — must be made today, launch is Friday
```

**Context:**
```
Engineering team has been blocked for 2 weeks waiting for 
this decision. $2M in revenue is at stake. Decision cannot 
be made async because security, legal, and engineering all 
have conflicting requirements that need live negotiation.
```

**Cost:** ~$1,890/session · one-time
**What AI should say:** Worth every dollar. Irreversible decision
with major financial impact. All stakeholders essential.

---

## SCENARIO 5 — Sprint Planning (Borderline)

**Title:** Sprint Planning
**Duration:** 2 hours
**Recurrence:** Bi-weekly
**Expected Score:** 6-7/10 — Borderline, Could Be Optimized

**Attendees:**
- Marcus Johnson — Director — $320,000
- Priya Sharma — Product Manager — $210,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Emily Watson — Engineer — $195,000
- James Liu — Engineer — $190,000
- Tyler Brooks — Engineer — $185,000
- Lena Torres — Designer — $180,000
- Ryan Mitchell — Manager — $260,000

**Agenda:**
```
1. Review last sprint velocity
2. Prioritize backlog items for next sprint
3. Assign story points to tickets
4. Identify dependencies and risks
5. Confirm sprint goal
```

**Context:**
```
Standard bi-weekly sprint planning. The backlog is well 
maintained. Engineers usually agree on estimates quickly. 
The Director attends but rarely speaks.
```

**Cost:** ~$1,285/session · ~$33,410/year
**What AI should say:** Borderline. Meeting is necessary but
Director is optional. Could be shortened to 90 minutes with
better pre-work on ticket grooming.

---

## SCENARIO 6 — Client Call (Too Many Senior People)

**Title:** Client sync call — Acme Corp quarterly review
**Duration:** 30 min
**Recurrence:** Weekly
**Expected Score:** 3-4/10 — Borderline to Email

**Attendees:**
- Sarah Chen — VP / Executive — $450,000
- Marcus Johnson — Director — $320,000
- Priya Sharma — Product Manager — $210,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Ryan Mitchell — Manager — $260,000
- Aisha Brown — Sales Manager — $200,000
- Lena Torres — Designer — $180,000

**Agenda:**
```
1. Status update on deliverables
2. Client questions
3. Next steps
```

**Context:**
```
Weekly client status call. The client usually just wants to 
know if things are on track. VP and Director joined once 
6 months ago and never stopped being invited. Engineers 
spend 4 hours preparing slides for a 30-minute call.
```

**Cost:** ~$1,120/session · ~$58,240/year
**What AI should say:** VP, Director, and engineers are all
optional. Only PM and Sales Manager needed. Slides should
be replaced with a written update sent the day before.

---

## SCENARIO 7 — Knowledge Transfer (Worth It)

**Title:** Knowledge Transfer — new payment system architecture
**Duration:** 1 hour
**Recurrence:** One-time
**Expected Score:** 7-8/10 — Worth Every Dollar

**Attendees:**
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Emily Watson — Engineer — $195,000
- James Liu — Engineer — $190,000
- Tyler Brooks — Engineer — $185,000
- Zoe Patel — Junior Engineer — $145,000
- Chris Walker — Data Scientist — $240,000
- Neha Gupta — Senior Engineer — $270,000

**Agenda:**
```
1. Overview of new payment architecture
2. Walk through critical code paths live
3. Q&A on edge cases
4. Handoff of ownership to Emily and James
```

**Context:**
```
David is leaving the team in 2 weeks. He is the only person 
who understands the payment system. This is a one-time 
transfer of critical institutional knowledge that cannot 
be done through documentation alone.
```

**Cost:** ~$510/session · one-time
**What AI should say:** Worth it. Live Q&A and code walkthrough
require real-time interaction. Cannot be replaced by a doc.

---

## SCENARIO 8 — Interview Panel (Too Many Interviewers)

**Title:** Technical interview — senior engineering candidate
**Duration:** 45 min
**Recurrence:** One-time
**Expected Score:** 4-5/10 — Borderline

**Attendees:**
- Sarah Chen — VP / Executive — $450,000
- Marcus Johnson — Director — $320,000
- Rachel Kim — Director — $310,000
- Ryan Mitchell — Manager — $260,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Priya Sharma — Product Manager — $210,000

**Agenda:**
```
1. Candidate introduction
2. Technical assessment
3. Culture fit discussion
4. Panel Q&A
```

**Context:**
```
8 people interviewing one candidate. VP and both Directors 
scheduled themselves into a first-round interview. Candidate 
has not been screened yet. This is the first conversation 
with this person.
```

**Cost:** ~$666/session · one-time
**What AI should say:** Way too many senior people for a first
round. VP and Directors should not be in round 1. Reduce to
Manager + 2 Senior Engineers only.

---

## SCENARIO 9 — Q3 Planning (Sounds Important, Is Not)

**Title:** Q3 Planning Session
**Duration:** 2 hours
**Recurrence:** Monthly
**Expected Score:** 2/10 — This Could Have Been An Email

**Attendees:**
- Sarah Chen — VP / Executive — $450,000
- Marcus Johnson — Director — $320,000
- Rachel Kim — Director — $310,000
- Priya Sharma — Product Manager — $210,000
- David Park — Senior Engineer — $280,000
- Alex Rodriguez — Senior Engineer — $275,000
- Neha Gupta — Senior Engineer — $270,000
- Ryan Mitchell — Manager — $260,000
- Lena Torres — Designer — $180,000
- Aisha Brown — Sales Manager — $200,000

**Agenda:**
```
1. Review last quarter
2. Set goals for next quarter
3. Team updates
4. Open discussion
```

**Context:**
```
Nobody prepares for this meeting. Last 3 sessions ended 
with "let's take this offline and align async." Goals set 
in this meeting are never tracked. Engineers find it 
demotivating. The VP spends 2 hours in a room and leaves 
with no decisions made.
```

**Cost:** ~$2,480/session · ~$29,760/year
**What AI should say:** Cancel this meeting. Context shows
zero outcomes from 3 consecutive sessions. Replace with a
structured async doc where everyone submits their Q3 goals
in writing before a 30-minute decision-only call.

---

## SCENARIO 10 — 1:1 Check-in (Always Worth It)

**Title:** Weekly 1:1 — manager and engineer
**Duration:** 30 min
**Recurrence:** Weekly
**Expected Score:** 8/10 — Worth Every Dollar

**Attendees:**
- Ryan Mitchell — Manager — $260,000
- Emily Watson — Engineer — $195,000

**Agenda:**
```
1. Emily's progress on authentication feature
2. Career development discussion
3. Any concerns or blockers
4. Feedback exchange
```

**Context:**
```
Emily joined 3 months ago. Ryan uses this time to mentor 
her, unblock her work, and build trust. The relationship 
has measurably improved Emily's output and retention risk 
has dropped since they started these sessions.
```

**Cost:** ~$108/session · ~$5,616/year
**What AI should say:** Worth it. Human relationships and
mentorship require live presence. This is one of the highest
ROI meetings in the company.

---

## DEMO DAY ORDER

Run these in this exact order for maximum impact:

1. **Scenario 1** — Daily Standup → $51,480/year → 2/10 → savings banner hits
2. **Scenario 2** — Production Outage → 9/10 → "Meeting Needed" → shows contrast
3. **Scenario 4** — Build vs Buy → 9/10 → agenda justifies the cost
4. **Scenario 9** — Q3 Planning → sounds important → 2/10 → context destroys it
5. **Let a judge enter their own meeting** → live reaction

---

## WHAT TO SAY AT EACH RESULT

| Score | What to say |
|---|---|
| 1-3 | "The AI caught something nobody in that room was saying out loud." |
| 4-6 | "Borderline — the agenda is the only thing keeping this meeting alive." |
| 7-8 | "Worth it — but notice it trimmed 2 people who didn't need to be there." |
| 9-10 | "This is what a meeting that justifies its cost looks like." |
