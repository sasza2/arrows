import nodeValue from 'helpers/nodeValue';

const TO_COMPARE = ['x', 'y', 'width', 'height'];
const REFRESH_TIME = 150; // ms

const comparePositions = (previousPositions, node) => {
  const rect = node.getBoundingClientRect();
  return {
    equal: !TO_COMPARE.some((prop) => previousPositions[prop] !== rect[prop]),
    rect,
  };
};

const nextPositions = ({ previousPositions, fromNode, toNode }) => {
  const current = {};

  current.from = comparePositions(previousPositions.from, fromNode);
  current.to = comparePositions(previousPositions.to, toNode);

  if (current.from.equal && current.to.equal) return null;

  return {
    from: current.from.rect,
    to: current.to.rect,
  };
};

const observer = (from, to) => {
  const props = {
    from,
    to,
  };

  const previousPositions = { from: {}, to: {} };
  let callback = null;

  const timer = setInterval(() => {
    const fromNode = nodeValue(props.from.node);
    const toNode = nodeValue(props.to.node);

    if (
      !fromNode || !toNode || !document.body.contains(fromNode)
      || !document.body.contains(toNode)
    ) {
      return;
    }
    const next = nextPositions({ previousPositions, fromNode, toNode });
    if (!next) return;
    previousPositions.from = next.from;
    previousPositions.to = next.to;
    if (callback) callback();
  }, REFRESH_TIME);

  const observe = (handler) => {
    callback = handler;
  };

  const clear = () => clearInterval(timer);

  const setFrom = (nextFrom) => {
    props.from = nextFrom;
  };

  const setTo = (nextTo) => {
    props.to = nextTo;
  };

  return {
    observe,
    timer,
    clear,
    setFrom,
    setTo,
  };
};

export default observer;
