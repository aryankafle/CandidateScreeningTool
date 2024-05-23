import { ServerApiVersion } from 'mongodb';





export const gridFS = {

  bucketName: 'files',
  chunkSize: 16384

}

const mongoConfig = {

    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },

}

export default mongoConfig