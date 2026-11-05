export const eventCategories = [
  { id: 'literature', label: 'Literature' },
  { id: 'arts', label: 'Arts' },
  { id: 'cultural-traditions', label: 'Cultural Traditions' },
] as const;

export const eventCountries = [
  { id: 'sweden', label: 'Sweden', zone: 'Europe/Stockholm' },
  { id: 'norway', label: 'Norway', zone: 'Europe/Oslo' },
  { id: 'denmark', label: 'Denmark', zone: 'Europe/Copenhagen' },
  { id: 'finland', label: 'Finland', zone: 'Europe/Helsinki' },
  { id: 'iceland', label: 'Iceland', zone: 'Atlantic/Reykjavik' },
  { id: 'faroe-islands', label: 'Faroe Islands', zone: 'Atlantic/Faroe' },
  { id: 'greenland', label: 'Greenland', zone: 'America/Nuuk' },
  { id: 'aland', label: 'Åland', zone: 'Europe/Mariehamn' },
  { id: 'nordic-region', label: 'Across the Nordic region', zone: 'Europe/Stockholm' },
] as const;

export type CalendarRecord = {
  title: string; category: string; country: string;
  start_date: string; end_date: string;
  draft?: boolean; cancelled?: boolean;
};

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

/** YAML timestamps and quoted CMS dates have the same schema output. */
export function normaliseCalendarDate(value: unknown): unknown {
  if (value instanceof Date && Number.isFinite(value.valueOf())) return value.toISOString().slice(0, 10);
  return typeof value === 'string' ? value.trim() : value;
}

export function localDay(now: Date, zone = 'Europe/Stockholm'): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

export function monthOptions(now = new Date()) {
  const current = localDay(now).slice(0, 7);
  const [year, month] = current.split('-').map(Number);
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1 + i, 15, 12));
    return { value: date.toISOString().slice(0, 7), label: new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date) };
  });
}

export function eventHasEnded(event: CalendarRecord, now = new Date()): boolean {
  const zone = eventCountries.find(country => country.id === event.country)?.zone ?? 'Europe/Stockholm';
  return event.end_date < localDay(now, zone);
}

export function overlapsMonth(event: CalendarRecord, month: string): boolean {
  if (month === 'all') return true;
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return false;
  const [year, number] = month.split('-').map(Number);
  const last = new Date(Date.UTC(year, number, 0, 12)).toISOString().slice(0, 10);
  return event.start_date <= last && event.end_date >= `${month}-01`;
}

export function filterCalendar<T extends { id: string; data: CalendarRecord }>(
  entries: T[], filters: { month: string; country: string; category: string }, now = new Date()
): T[] {
  return entries.filter(({ data }) => !data.draft && !data.cancelled && !eventHasEnded(data, now)
    && overlapsMonth(data, filters.month)
    && (filters.country === 'all' || data.country === filters.country)
    && (filters.category === 'all' || data.category === filters.category))
    .sort((a, b) => a.data.start_date.localeCompare(b.data.start_date)
      || a.data.title.localeCompare(b.data.title, 'en') || a.id.localeCompare(b.id));
}

export function displayDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}
