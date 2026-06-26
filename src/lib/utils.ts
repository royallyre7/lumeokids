/**
 * Calculate a human-readable age string from a date of birth.
 * Returns e.g. "4y 11m" or "3m"
 */
export function calculateAge(dateOfBirth: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - dateOfBirth.getTime();
  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (diffMs % (365.25 * 24 * 60 * 60 * 1000)) /
      (30.44 * 24 * 60 * 60 * 1000)
  );

  if (years > 0) {
    return `${years}y ${months}m`;
  }
  return `${months}m`;
}

/**
 * Returns the first character of a name, uppercased.
 */
export function getInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

/**
 * Returns a greeting based on the current hour.
 */
export function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
