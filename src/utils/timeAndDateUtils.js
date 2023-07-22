function getCurrentDate() {
  const currentDate = new Date();
  const [day, hours, minutes, seconds, year, month, time] = [
    currentDate.getDate(),
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds(),
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getTime(),
  ];

  return {
    day,
    hours,
    minutes,
    seconds,
    year,
    month,
    time,
  };
}

function getCurrentTime() {
  const currentDate = new Date();
  console.log(currentDate);
}

export { getCurrentDate };
