import Container from 'typedi';
import { VitaService } from '../service';

describe('Vita Service Unit Test', () => {
  it('should instantiate the vita service', () => {
    const vitaService = Container.get(VitaService);

    expect(!!vitaService).toBe(true);
  });
});
