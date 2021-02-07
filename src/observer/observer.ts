import nodeValue from 'helpers/nodeValue';
import { Anchor } from '../anchor'
import { Measure } from '../measure'

const ATTRIBUTES_TO_COMPARE = ['x', 'y', 'width', 'height'];
const DEFAULT_REFRESH_TIME = 150; // ms
const INITIAL_MEASURES: MemoMeasures = { from: null, to: null };

type MeasureAttribute = 'x' | 'y' | 'width' | 'height'

type MemoMeasures = {
  from: Measure;
  to: Measure;
}

type Observer = {
  clear: () => void;
}

const compare = (measure: Measure, node: HTMLElement) => {
  const rect = node.getBoundingClientRect();

  if (!measure) return { equal: false, rect };

  return {
    equal: !ATTRIBUTES_TO_COMPARE.some((attr: MeasureAttribute) => measure[attr] !== rect[attr]),
    rect,
  };
};

const produceNextMeasures = (
  currentMeasures: MemoMeasures,
  fromNode: HTMLElement,
  toNode: HTMLElement,
): MemoMeasures => {
  const comparedFrom = compare(currentMeasures.from, fromNode);
  const comparedTo = compare(currentMeasures.to, toNode);

  if (comparedFrom.equal && comparedTo.equal) return null;

  return {
    from: comparedFrom.rect,
    to: comparedTo.rect,
  };
};

const observer = (from: Anchor, to: Anchor, update: () => void): Observer => {
  let currentMeasures: MemoMeasures = INITIAL_MEASURES;

  const timer = setInterval(() => {
    const fromNode = nodeValue(from.node);
    const toNode = nodeValue(to.node);

    if (!fromNode || !toNode) return;

    const nextMeasures = produceNextMeasures(currentMeasures, fromNode, toNode);
    if (!nextMeasures) return;

    if (currentMeasures !== INITIAL_MEASURES) update();

    currentMeasures = nextMeasures;
  }, DEFAULT_REFRESH_TIME);

  const clear = () => clearInterval(timer);

  return { clear };
};

export default observer;
