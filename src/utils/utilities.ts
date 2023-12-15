export const formatNumber = (number: number) => {
  return Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(
    number
  );
};
export const toMonthDayFormat = (dateStart: string, dateFinish: string) => {
  //return date but formatted like "Noviembre 13 del 2020" with the month in spanish
  const dateObjectStart = new Date(dateStart);
  const dateObjectFinish = new Date(dateFinish);
  const monthStart = dateObjectStart.toLocaleString('es-ES', {
    month: 'short',
  });
  const monthFinish = dateObjectFinish.toLocaleString('es-ES', {
    month: 'short',
  });
  const dayStart = dateObjectStart.getDate();
  const dayFinish = dateObjectFinish.getDate();
  return `${dayStart} ${monthStart} - ${dayFinish} ${monthFinish}`;
};
export const singleMonthDayFormat = (date: string) => {
  //return date but formatted like "Noviembre 13 del 2020" with the month in spanish
  const dateObject = new Date(date);
  dateObject.setDate(dateObject.getDate() + 1);
  const month = dateObject.toLocaleString('es-ES', { month: 'short' });
  const day = dateObject.getDate();
  //subtract 1 day to the date but consider month jumps after substraction

  return `${day} ${month}`;
};

export const getFechaHours = (fecha: string) => {
  const fechaDate = new Date(fecha);
  return new Date(fechaDate).toLocaleTimeString();
};

export const getFormatedFecha = (fecha: string) => {
  const date = new Date(fecha);
  // Get day, month, and year components from the Date object
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  // Create the formatted date string in DD/MM/YYYY format
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};