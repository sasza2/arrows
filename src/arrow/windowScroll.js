const windowScroll = () => {
  if (!window) return { scrollX: 0, scrollY: 0 };
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};

export default windowScroll;
