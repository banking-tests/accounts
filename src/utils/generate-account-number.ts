export function generateAccountNumber(): string {
  return Array.from(Array(18).keys()).reduce((acc) => {
    return acc + Math.floor(Math.random() * 10);
  }, '');
}
