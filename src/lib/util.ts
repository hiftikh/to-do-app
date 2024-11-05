export function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  const formatDate = `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString(
    undefined,
    { weekday: "short", day: "2-digit", month: "short", year: "numeric" }
  )}`;
  return formatDate;
}

export function isEmptyString(str: string) {
  return /^\s*$/.test(str) || !str || str.length === 0;
}
