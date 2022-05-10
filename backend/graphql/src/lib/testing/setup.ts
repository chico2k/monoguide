import 'reflect-metadata';
import { ContainerInjection } from '../ContainerInjection';

export default async () => {
  ContainerInjection.setupContainerInjection({ env: 'TESTING' });
};
