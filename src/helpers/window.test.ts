import { assignArrowCreate } from './window'

test('assignArrowCreate', () => {
  assignArrowCreate(window);
  assignArrowCreate(null);
});
