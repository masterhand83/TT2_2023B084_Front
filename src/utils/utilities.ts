
export const formatNumber = (number: number) => {
  return Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
    number
  );
}