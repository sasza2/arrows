const nodeValue = (node) => (typeof node === 'function'
  ? node()
  : node
);

export default nodeValue;
