import { getProjects, logger, Tree } from '@nrwl/devkit';
import { execSync } from 'child_process';

export default async function (host: Tree, schema: any) {
  const project = getProjects(host).get(schema.app);

  if (!project) {
    logger.error(`Project ${schema.name} not found`);
    return;
  }

  logger.log('\x1b[34m', `Generating module`);
  execSync(`nx g @nrwl/nest:module --p ${schema.app} --name ${schema.module}`);
  logger.log('\x1b[34m', `Generating service`);
  execSync(`nx g @nrwl/nest:service --p ${schema.app} --name ${schema.module}`);
  logger.log('\x1b[34m', `Generating controller`);
  execSync(
    `nx g @nrwl/nest:controller --p ${schema.app} --name ${schema.module}`
  );
}
