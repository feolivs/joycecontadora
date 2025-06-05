import { defineConfig } from '@sentry/cli'

export default defineConfig({
  org: 'your-org-name',
  project: 'your-project-name',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: process.env.RELEASE_VERSION,
  include: ['dist'],
  ignore: ['node_modules', 'webpack.config.js'],
  urlPrefix: '~/',
  sourcemaps: {
    include: ['dist'],
    ignore: ['node_modules'],
  },
  deploy: {
    env: process.env.NODE_ENV,
    name: process.env.RELEASE_VERSION,
  },
}) 