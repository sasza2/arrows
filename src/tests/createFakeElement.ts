import { Measure } from '../measure'

const createFakeElement = (measure: Measure): HTMLElement => {
  const element = document.createElement('div')
  element.style.position = 'absolute'
  element.style.left = `${measure.x}px`;
  element.style.top = `${measure.y}px`;
  element.style.width = `${measure.width}px`;
  element.style.height = `${measure.height}px`;
  element.getBoundingClientRect = () => measure as DOMRect;

  document.body.appendChild(element);

  return element;
}

export default createFakeElement
