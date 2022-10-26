
/**
 * PAD Right completa a string com caracteres a string
 * @param str string
 * @param size repetições máxima
 * @param char elemento que será repetido
 * @returns string
 */
export function padRight(str: string, size: number, char?: string): string {
  if (!char) {
    char = '0';
  }
  let s = str + '';
  while (s.length < size) {
    s = s + char;
  }
  return s;
}
