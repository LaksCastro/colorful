String.prototype.divide = function (stringToDivide) {
  return this.split(stringToDivide).filter(item => item !== "");
}

String.prototype.stringToHTML = function () {
  const str = this;
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}
