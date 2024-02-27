import dotenv from "dotenv"

dotenv.config()





const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${process.env.AUTH0_CLIENT_SECRET}`,
  baseURL: 'http://localhost:3000',
  clientID: `${process.env.AUTO0_CLIENT_ID}`,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
}; 





export default auth0Config