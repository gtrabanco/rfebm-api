// This will be useful to search for people or teams because the encoding problem
export function wordsDistance(str1: string, str2: string): number {
  if (str1 === str2) return 0;
  let distance = Math.abs(str1.length - str2.length);
  const maxCheck = Math.max(str1.length - distance, str2.length - distance);

  for (let i = 0; i < maxCheck; i++) {
    const c1 = str1.at(i);
    const c2 = str2.at(i);
    if (c1 !== c2) ++distance;
  }

  return distance;
}
