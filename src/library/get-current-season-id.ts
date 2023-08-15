export function getCurrentSeasonId() {
  const now = new Date();
  const year = now.getFullYear();
  if (now.getMonth() < 7) {
    return Number(`${year - 1}${year}`);
  }

  return Number(`${year}${year + 1}`);
}
