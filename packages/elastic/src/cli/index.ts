#!/usr/bin/env node
/* eslint-disable vars-on-top */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import path from 'path';
import dotenv from 'dotenv';
import { Command } from 'commander';
import { IndexDeploy } from '../IndexDeploy/index';
import { IndexTemplateHandler } from '../IndexTemplateHandler/index';
import { AliasHandler } from '../AliasHandler';
import { ConfigHandler } from '../ConfigHandler';
import { CLIHandler } from './CLIHandler';

const pathToEnv = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '.env'
);

dotenv.config({ path: pathToEnv });


declare global {
  var es: any;
  namespace NodeJS {
    interface ProcessEnv {
      ELASTIC_HOST: string;
    }
  }
}
export declare let es: any;

const program = new Command();

program
  .command(`template:update`)
  .description('Update Mapping Files')
  .action(() => {
    const make = async () => {
      const handler = new IndexTemplateHandler();

      const success = await handler.putAllIndexTemplate();
      if (!success) process.exit(1);
      process.exit(0);
    };
    make();
  });

program
  .command(`index:create`)
  .description('Update Mapping Files')
  .action(() => {
    const make = async () => {
      const handler = new IndexDeploy();

      const indexTypes = ConfigHandler.getIndexTypes();

      await Promise.all(
        indexTypes.map(async (indexType) => {
          const success = await handler.createIndex(indexType);
          if (!success) process.exit(1);
        })
      );
      process.exit(0);
    };
    make();
  });

program
  .command(`alias:get`)
  .description('Get all alias')
  .action(() => {
    const make = async () => {
      const handler = new AliasHandler();

      const success = await handler.getAlias();
      if (!success) process.exit(1);
      process.exit(0);
    };
    make();
  });

program
  .command(`alias:remove`)
  .description('Remove all alias')
  .action(() => {
    const make = async () => {
      const handler = new AliasHandler();

      const success = await handler.removeAlias('user');
      if (!success) process.exit(1);
      process.exit(0);
    };
    make();
  });

program
  .command(`index:delete`)
  .description('Remove all alias')
  .action(() => {
    const make = async () => {
      const handler = new CLIHandler();

      const success = await handler.deleteIndexHandler({ all: true });
      if (!success) process.exit(1);
      process.exit(0);
    };
    make();
  });

program.parse(process.argv);
