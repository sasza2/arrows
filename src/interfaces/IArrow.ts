import { RefObject } from 'preact'

import { Anchor } from '../anchor';
import { HeadFactory, HeadFactoryList } from '../head';

export interface IArrow {
  node: DocumentFragment;
  clear: () => void;
}

export interface IArrowProps {
  className?: string,
  head?: HeadFactory | HeadFactoryList,
  from: Anchor | HTMLElement | (() => HTMLElement),
  to: Anchor | HTMLElement | (() => HTMLElement),
}

export interface IArrowComponentProps {
  className: string,
  head?: HeadFactory | HeadFactoryList,
  from: Anchor,
  to: Anchor,
  forwardRef?: RefObject<SVGSVGElement>,
}