export default function getDateFormat (date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const objDate = new Date(date);
  return months[objDate.getMonth()] + ' ' + objDate.getDate() + ', ' + objDate.getFullYear();
}
