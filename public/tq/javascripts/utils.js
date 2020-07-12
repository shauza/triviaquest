function debug(msg) {
  $('#debug').append(msg + "<br>");
}

function findObjectInArrayByProperty(array, propertyName, propertyValue) {
  return array.find((o) => { return o[propertyName] === propertyValue; });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(ua) {
  for (let i = ua.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = ua[i];
    ua[i] = ua[j];
    ua[j] = temp;
  }
  return ua;
}