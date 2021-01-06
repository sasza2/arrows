import { HEAD_DEFAULT_SIZE } from 'consts';
import { Head } from '../head'

const none = (): Head => ({
  node: null,
  width: HEAD_DEFAULT_SIZE,
  height: HEAD_DEFAULT_SIZE,
});

export default none;
