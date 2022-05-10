import fs from 'fs';
import { pathToEnv } from '../setup';

it('should check if env file is presend', () => {
  const exists = fs.existsSync(pathToEnv);

  expect(exists).toBe(true);
});
