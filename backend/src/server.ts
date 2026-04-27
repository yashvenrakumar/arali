import { app } from './app'
import { envConfig } from './config/env'

app.listen(envConfig.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${envConfig.port}`)
  // eslint-disable-next-line no-console
  console.log(`Swagger docs available at http://localhost:${envConfig.port}/api-docs`)
})

