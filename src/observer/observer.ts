import nodeValue from 'helpers/nodeValue';
import { Anchor } from '../anchor'
import { Measure } from '../measure'

const ATTRIBUTES_TO_COMPARE = ['x', 'y', 'width', 'height'];
const DEFAULT_REFRESH_TIME = 0; // ms
const INITIAL_MEASURES: MemoMeasures = { from: null, to: null };

type MeasureAttribute = 'x' | 'y' | 'width' | 'height'

type MemoMeasures = {
  from: Measure;
  to: Measure;
}

type Observer = (
  from: Anchor,
  to: Anchor,
  options: {
    update: () => void,
    updateDelay?: number,
  },
) => {
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

const observer: Observer = (from, to, { updateDelay = DEFAULT_REFRESH_TIME, update }) => {
  let currentMeasures: MemoMeasures = INITIAL_MEASURES;

  const checkMeasures = () => {
    const fromNode = nodeValue(from.node);
    const toNode = nodeValue(to.node);

    if (!fromNode || !toNode) return;

    const nextMeasures = produceNextMeasures(currentMeasures, fromNode, toNode);
    if (!nextMeasures) return;

    if (currentMeasures !== INITIAL_MEASURES) update();

    currentMeasures = nextMeasures;
  }

  if (updateDelay) {
    const timer = setInterval(checkMeasures, updateDelay);
    return { clear: () => clearInterval(timer) }
  }

  let animationFrameId: number

  const animationFrame = () => {    
    checkMeasures()
    animationFrameId = requestAnimationFrame(animationFrame)
  }

  animationFrameId = requestAnimationFrame(animationFrame)
  return { clear: () => cancelAnimationFrame(animationFrameId) }
};

export default observer;
