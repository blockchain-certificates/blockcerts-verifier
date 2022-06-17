const toBase64 = (textContent: string): string => {
  return window.btoa(textContent);
};

export default toBase64;
