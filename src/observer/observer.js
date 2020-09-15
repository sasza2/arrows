const TO_COMPARE = ['x', 'y', 'width', 'height'];

const comparePositions = (previousPositions, node) => {
  const rect = node.getBoundingClientRect();
  return {
    equal: !TO_COMPARE.some((prop) => previousPositions[prop] !== rect[prop]),
    rect,
  };
};

const nextPositions = ({ previousPositions, from, to }) => {
  const current = {};

  current.from = comparePositions(previousPositions.from, from.node);
  current.to = comparePositions(previousPositions.to, to.node);

  if (current.from.equal && current.to.equal) return null;

  return {
    from: current.from.rect,
    to: current.to.rect,
  };
};

const observer = (from, to) => {
  const previousPositions = { from: {}, to: {} };
  let callback = null;

  const timer = setInterval(() => {
    if (
      !document.body.contains(from.node.parentNode)
      || !document.body.contains(to.node.parentNode)
    ) {
      clearInterval(timer);
      return;
    }
    const next = nextPositions({ previousPositions, from, to });
    if (!next) return;
    previousPositions.from = next.from;
    previousPositions.to = next.to;
    if (callback) callback();
  }, 150);

  const observe = (handler) => {
    callback = handler;
  };

  const clear = () => clearInterval(timer);

  return {
    observe,
    timer,
    clear,
  };
};

export default observer;
