/**
 * Note:
 * "module-alias" only used in this file to resolve `~` alias,
 * Next.js bundles will be resolved with Babel (see ".babelrc")
 */
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import 'module-alias/register'
import next from 'next'

import { ROUTES } from '~/common/enums'

// load environment variables from .env
// skip error for CI
try {
  const dotEnvResult = dotenv.config()
  if (dotEnvResult.error) {
    console.log('error loading .env file', dotEnvResult.error)
  }
} catch (err) {
  console.log('error loading .env file', err)
}

const isProd = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000
const ASSET_PREFIX = process.env.ASSET_PREFIX
const app = next({ dev: !isProd })
const handle = app.getRequestHandler()

if (ASSET_PREFIX) {
  app.setAssetPrefix(ASSET_PREFIX)
}

app
  .prepare()
  .then(() => {
    const server = express()

    // middlewares
    server.use(helmet())

    ROUTES.forEach(({ href, as, handler }) => {
      server.get(as, (req, res, nx) => {
        if (handler) {
          handler(req, res, nx)
        }

        return app.render(req, res, href, { ...req.query, ...req.params })
      })
    })

    // fallback
    server.get('*', (req, res) => handle(req, res))

    server.listen(PORT, (err: any) => {
      if (err) {
        throw err
      }
      console.log('> Ready on http://localhost:' + PORT)
    })
  })
  .catch((err: any) => {
    console.error(err.stack)
    process.exit(1)
  })
