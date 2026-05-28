/** Formats the current time as a `hh:mm utc` string for the status bar. */
export function formatClock(): string {
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm} utc`;
}
