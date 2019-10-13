const TO_COMPARE = ['x', 'y', 'width', 'height'];

const comparePositions = (prev, node) => {
  const rect = node.getBoundingClientRect();
  return {
    equal: !TO_COMPARE.some((prop) => prev[prop] !== rect[prop]),
    rect,
  };
};

const nextPositions = ({ prevs, from, to }) => {
  const current = {};

  current.from = comparePositions(prevs.from, from.node);
  current.to = comparePositions(prevs.to, to.node);

  if (current.from.equal && current.to.equal) return null;

  return {
    from: current.from.rect,
    to: current.to.rect,
  };
};

const observer = (from, to) => {
  const prevs = { from: {}, to: {} };
  let callback = null;

  const timer = setInterval(() => {
    const next = nextPositions({ prevs, from, to });
    if (!next) return;
    prevs.from = next.from;
    prevs.to = next.to;
    if (callback) callback();
  }, 150);

  const observe = (handler) => {
    callback = handler;
  };

  return {
    observe,
    timer,
  };
};

export default observer;
