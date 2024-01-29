import { ServerApiVersion } from 'mongodb';





const mongoConfig = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

export default mongoConfig