import type { Vita as VitaDB } from '@prisma/client';
import Container, { Service } from 'typedi';
import { ValidationError } from 'apollo-server-lambda';
import type { IContext } from "../../lib/apolloServer/types";
import type { CreateVitaInput, UpdateVitaInput } from './types';
import { VitaService } from './service';

@Service()
class VitaController {
  vitaService = Container.get(VitaService);

  createVitaController = async (
    data: CreateVitaInput,
    ctx: IContext
  ): Promise<VitaDB> => {
    const vitaOrError = await this.vitaService.createVitaService(data, ctx);

    switch (vitaOrError.type) {
      case 'CreateVitaFailed':
        throw new ValidationError('VITA_SERVICE_FAILED');
      case 'CreateVitaSuccess':
        return vitaOrError.data.vita;
    }
  };

  deleteVitaController = async (
    id: number,
    ctx: IContext
  ): Promise<boolean> => {
    const success = await this.vitaService.deleteVitaService(id, ctx);

    if (success) return true;
    return false;
  };

  updateVitaController = async (
    data: UpdateVitaInput,
    ctx: IContext
  ): Promise<VitaDB> => {
    const vitaOrError = await this.vitaService.updateVitaService(data, ctx);

    switch (vitaOrError.type) {
      case 'UpdateVitaFailed':
        throw new ValidationError('VITA_SERVICE_FAILED');
      case 'UpdateVitaSuccess':
        return vitaOrError.data.vita;
    }
  };
}

export { VitaController };
