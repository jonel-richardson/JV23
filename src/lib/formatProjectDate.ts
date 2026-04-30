export function formatProjectDate(dateString: string | undefined | null): string {
  if (!dateString) return ''
  const match = /^(\d{4})-(\d{2})-\d{2}$/.exec(dateString)
  if (!match) return ''
  const year = match[1]
  const month = String(Number(match[2]))
  return `${month}.${year}`
}
