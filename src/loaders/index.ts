import dependencyInjectorLoader from './dependencyInjector';

export default async ({ expressApp }) => {
  await dependencyInjectorLoader();

}