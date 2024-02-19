export default function sortDateAsc(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime()
}