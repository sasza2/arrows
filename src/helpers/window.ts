import arrowCreate from '../arrowCreate'
import { IArrow, IArrowProps } from '../interfaces/IArrow'
import { Point } from '../point'

declare global {
  interface Window {
    arrowCreate: (props: IArrowProps) => IArrow;
  }
}

export const assignArrowCreate = (customWindow: Window): void => {
  if (customWindow) customWindow.arrowCreate = arrowCreate;
}

export const getScrollPoint = (): Point => {
  if (!window) return { x: 0, y: 0 };
  return {
    x: window.scrollX,
    y: window.scrollY,
  };
};
