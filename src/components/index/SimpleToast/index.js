function SimpleToast(message) {
  const toastString = `
      <div id="toast-wrapper">${message}</div>
  `

  const toastNode = toastString.stringToHTML();

  const doc = document.body;

  doc.appendChild(toastNode);

  setTimeout(() => {
      doc.removeChild(toastNode);
  }, 1000);
}

export default SimpleToast;
