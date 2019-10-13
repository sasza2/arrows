import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';

const XMLNS = 'http://www.w3.org/2000/svg';

const createRef = () => {
  const set = (node) => {
    set.current = node;
  };

  set.current = null;
  return set;
};

const createStyle = (attribute) => {
  const style = Object.entries(attribute).reduce((prev, [key, value]) => {
    if (isNumber(value)) return `${key}: ${value}px; ${prev}`;
    return `${key}: ${value}; ${prev}`;
  }, '');
  return style.endsWith('; ') ? style.substring(0, style.length - 2) : style;
};

const createAttribute = (key, value) => {
  if (key === 'style') return createStyle(value);
  return value;
};

const attributeName = ({ key, node, value }) => {
  switch (key) {
    case 'className':
      return 'class';
    case 'ref':
      value(node);
      return null;
    default:
      return key;
  }
};

const create = (tagName, attributes, ...children) => {
  const node = document.createElementNS(XMLNS, tagName);
  Object.entries(attributes).forEach(([key, value]) => {
    const name = attributeName({ key, node, value });
    if (name) node.setAttributeNS(null, name, createAttribute(key, value));
  });

  if (children.length) {
    children.forEach((child) => {
      if (isObject(child)) node.appendChild(child);
      else node.innerHTML = children;
    });
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
  createRef,
  fake,
};
