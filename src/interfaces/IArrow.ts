import { RefObject } from 'preact'

import { Anchor, AnchorWithPoint } from '../anchor';
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
  forwardRef?: RefObject<SVGSVGElement>,
}

export interface IArrowComponentProps {
  className?: string,
  head?: HeadFactory | HeadFactoryList,
  from: AnchorWithPoint,
  to: AnchorWithPoint,
  forwardRef?: RefObject<SVGSVGElement>,
}
