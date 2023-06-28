import arrowCreate from '../arrowCreate'
import { IArrow, IArrowProps } from '../interfaces/IArrow'

declare global {
  interface Window {
    arrowCreate: (props: IArrowProps) => IArrow;
  }
}

export const assignArrowCreate = (customWindow: Window): void => {
  if (customWindow) customWindow.arrowCreate = arrowCreate;
}
