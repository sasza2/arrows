const TO_COMPARE = ['x', 'y', 'width', 'height'];

const comparePositions = (prev, node) => {
  const rect = node.getBoundingClientRect();
  return {
    equal: TO_COMPARE.any((prop) => prev[prop] !== rect[prop]),
    rect,
  };
};

const nextPositions = (prevs, arrow) => {
  const current = {};

  current.from = comparePositions(prevs.from, arrow.from.node);
  current.to = comparePositions(prevs.to, arrow.to.node);

  if (current.from.equal && current.to.equal) return null;

  return {
    from: current.from.rect,
    to: current.to.rect,
  };
};

const observer = (arrow) => {
  const prevs = { from: {}, to: {} };

  const timer = setInterval(() => {
    const next = nextPositions(prevs, arrow);
    if (!next) return;
    prevs.from = next.from;
    prevs.to = next.to;
  }, 150);

  return timer;
};

export default observer;
