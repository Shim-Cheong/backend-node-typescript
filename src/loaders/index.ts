import dependencyInjectorLoader from './dependencyInjector';
import expressLoader from './express';

export default async ({ expressApp }) => {
  await dependencyInjectorLoader();
  await expressLoader({ app: expressApp });

}