/** Formats the current time as a `hh:mm utc` string for the status bar. */
export function formatClock(): string {
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm} utc`;
}

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
];

/** Formats local date + time as `thu 29 may · 14:49` for the desktop top bar. */
export function formatDeskStamp(): string {
  const d = new Date();
  const day = DAYS[d.getDay()];
  const date = String(d.getDate()).padStart(2, '0');
  const mon = MONTHS[d.getMonth()];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${date} ${mon} · ${hh}:${mm}`;
}
