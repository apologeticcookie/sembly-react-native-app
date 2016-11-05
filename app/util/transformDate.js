const transformDate = (dateStr) => {
  // const months = ['January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dateUsed = new Date(dateStr);

  let amOrPm = '';
  const day = `${days[dateUsed.getDay() - 1]} `;
  const dateArr = dateUsed.toString().split(' ');
  const part1 = `${dateArr.slice(1, 2).join('. ')}. `;
  const part2 = `${dateArr.slice(2, 3).toString()} at `;
  const time = dateArr.slice(4, 5).toString();
  let hour = +(time.split(':')[0]);

  if (hour >= 12) {
    amOrPm = ' pm';
  } else {
    amOrPm = ' am';
  }

  hour = hour > 12 ? hour - 12 : hour;
  const part4 = (dateArr.slice(4, 5)).toString().split(':');
  part4.shift();
  part4.pop();

  return `${day}${part1}${part2}${hour}:${part4}${amOrPm}`;
};

export default transformDate;
