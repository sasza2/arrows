import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

const XMLNS = 'http://www.w3.org/2000/svg';

const createStyle = (value) => {
  const style = Object.entries(value).reduce((prev, [key, value]) => {
    if (isNumber(value)) return `${key}: ${value}px; ${prev}`;
    return `${key}: ${value}; ${prev}`;
  }, '');
  return style.endsWith('; ') ? style.substring(0, style.length - 2) : style;
};

const createAttribute = (key, value) => {
  if (key === 'style') return createStyle(value);
  return value;
};

const create = (tagName, attributes, children) => {
  const node = document.createElementNS(XMLNS, tagName);
  for (const key in attributes) {
    const value = attributes[key];
    node.setAttributeNS(null, key, createAttribute(key, value));
  }

  if (children) {
    if (isObject(children)) node.appendChild(children);
    else node.innerHTML = children;
  }

  return node;
};

// Only for testing
const fake = ({
  x, y, width, height,
}) => ({
  getBoundingClientRect: () => ({
    x, y, width, height,
  }),
});

export default {
  create,
  fake,
};
