#!/usr/bin/env node
// school-replan.cjs — the ONE implementation of `/school replan`'s dealing algorithm
// (spec-158, C2). Both the real `/school replan` workflow (Machine/Workflows/school.md
// Step 5) and the Learning card's course-final timeline preview (Start now / Schedule /
// Pause) must go through this script's relaySyllabus() rather than re-deriving the
// schedule by hand — a second estimator is exactly what spec-158 warns will drift.
//
// Usage:
//   node Machine/Scripts/school-replan.cjs [--user=nate] [--today=YYYY-MM-DD]
//     [--hold=<courseId>:<YYYY-MM-DD> ...] [--cap-at-planned-end] [--apply]
//
// With no flags: the "Start now" / plain replan dry run — dealt from today, floating.
// --hold=<id>:<date>   ("Schedule" option) that course's lessons may not start before <date>.
// --cap-at-planned-end ("Pause" option) never float past the configured semester end;
//                       whatever doesn't fit falls off (reported in `dropped`).
// --apply               write the result into Machine/School/syllabus.json (`rows` +
//                       `semester.end`) instead of just printing it — this is what a real
//                       `/school replan` run does after reporting the numbers.
//
// Prints one JSON object to stdout: { newEnd, plannedEnd, lessonsPerWeek, rows, dropped }.

const fs = require('fs');
const path = require('path');
const { relaySyllabus } = require('../../.obsidian/plugins/emai-command-center/lib/school-state.js');

const VAULT_ROOT = path.resolve(__dirname, '..', '..');

function parseArgs(argv) {
  const out = { hold: {}, capAtPlannedEnd: false, apply: false, user: 'nate', today: '' };
  argv.forEach((arg) => {
    if (arg === '--cap-at-planned-end') { out.capAtPlannedEnd = true; return; }
    if (arg === '--apply') { out.apply = true; return; }
    const m = arg.match(/^--([a-z-]+)=(.+)$/);
    if (!m) return;
    if (m[1] === 'user') out.user = m[2];
    else if (m[1] === 'today') out.today = m[2];
    else if (m[1] === 'hold') {
      const [id, date] = m[2].split(':');
      if (id && date) out.hold[id] = date;
    }
  });
  return out;
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const syllabusPath = path.join(VAULT_ROOT, 'Machine/School/syllabus.json');
  const progressPath = path.join(VAULT_ROOT, `Machine/School/progress-${args.user}.json`);

  const syllabus = JSON.parse(fs.readFileSync(syllabusPath, 'utf8'));
  let progress = { courses: {} };
  if (fs.existsSync(progressPath)) {
    try { progress = JSON.parse(fs.readFileSync(progressPath, 'utf8')); } catch (_) {}
  }
  const lessonsComplete = {};
  // spec-172 follow-up — status travels with the plan now. Without it relaySyllabus() lays out
  // all 24 courses whether or not Nate is taking them.
  const courseStatus = {};
  Object.entries(progress.courses || {}).forEach(([id, c]) => {
    if (c && c.lessons_complete) lessonsComplete[id] = c.lessons_complete;
    if (c && c.status) courseStatus[id] = c.status;
  });

  const result = relaySyllabus({
    todayIso: args.today || todayIso(),
    semester: syllabus.semester,
    courses: syllabus.courses,
    theoryOrder: syllabus.theory,
    prodOrder: syllabus.prod,
    // spec-172 Phase 3b — syllabus.json's third track array. Omitting it would silently drop
    // all 68 instrument lessons from every replan: pendingLessonsForTrack() only walks the ids
    // it is handed, so a course absent from every order array is "held out on purpose".
    instrumentOrder: syllabus.instrument,
    courseStatus,
    lessonsComplete,
    holdUntil: args.hold,
    capAtPlannedEnd: args.capAtPlannedEnd,
  });

  if (!result.exists) {
    console.error('school-replan: could not compute — check semester.start/today are valid YYYY-MM-DD');
    process.exit(1);
  }

  if (args.apply) {
    syllabus.rows = result.rows;
    syllabus.semester.end = result.newEnd;
    fs.writeFileSync(syllabusPath, `${JSON.stringify(syllabus, null, 2)}\n`);
  }

  console.log(JSON.stringify({
    newEnd: result.newEnd,
    plannedEnd: result.plannedEnd,
    lessonsPerWeek: result.lessonsPerWeek,
    currentWeek: result.currentWeek,
    dropped: result.dropped,
    applied: args.apply,
    rows: result.rows,
  }, null, 2));
}

main();
