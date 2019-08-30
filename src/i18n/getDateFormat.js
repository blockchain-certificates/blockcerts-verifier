import getText from './getText';

function replaceMonth (pattern, monthIndex) {
  const months = getText('date', 'months');
  return pattern.replace('MM', months[monthIndex]);
}

function replaceDay (pattern, day) {
  return pattern.replace('DD', day);
}

function replaceYear (pattern, year) {
  return pattern.replace('YYYY', year);
}

export default function getDateFormat (date) {
  const pattern = getText('date', 'pattern');
  const objDate = new Date(date);

  let formattedDate = replaceMonth(pattern, objDate.getMonth());
  formattedDate = replaceDay(formattedDate, objDate.getDate());
  formattedDate = replaceYear(formattedDate, objDate.getFullYear());
  return formattedDate;
}
