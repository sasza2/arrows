import { RefObject } from 'preact'

import { Anchor } from '../anchor';
import { HeadFactory } from '../head';

export interface IArrow {
  node: DocumentFragment;
  clear: () => void;
}

export interface IArrowProps {
  className?: string,
  head?: HeadFactory,
  from: Anchor,
  to: Anchor,
  forwardRef?: RefObject<SVGSVGElement>,
}
