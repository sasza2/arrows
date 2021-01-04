const nodeValue = (node: HTMLElement | (() => HTMLElement)): HTMLElement => {
  const nodeSelected = (typeof node === 'function'
    ? node()
    : node
  );

  if (!document.body.contains(nodeSelected)) return null;

  return nodeSelected;
};

export default nodeValue;
