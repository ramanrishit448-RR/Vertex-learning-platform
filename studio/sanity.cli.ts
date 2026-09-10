import {defineCliConfig} from 'sanity/cli'

import {dataset, projectId} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  deployment: {appId: 'juo7b9ktlnn5vm3nevzfjn9d'},
  typegen: {
    enabled: true,
    // Queries live in the Next.js app one level up.
    path: '../{app,components,lib,sanity}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../sanity.types.ts',
    overloadClientMethods: true,
  },
})
