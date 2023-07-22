function getCurrentDate() {
  const currentDate = new Date();
  const [
    day,
    hours,
    minutes,
    seconds,
    year,
    month,
    timeString,
    dateString,
  ] = [
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.toTimeString(),
    currentDate.toDateString(),
  ];

  return {
    day,
    hours,
    minutes,
    seconds,
    year,
    month,
    timeString,
    dateString
  };
}

export { getCurrentDate };
