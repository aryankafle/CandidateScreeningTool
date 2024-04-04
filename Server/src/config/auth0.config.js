import config from "./env.config.js";





const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${config.AUTH0_CLIENT_SECRET}`,
  baseURL: config.CLIENT,
  clientID: `${config.AUTO0_CLIENT_ID}`,
  issuerBaseURL: config.AUTH0_ISSUER_BASE_URL
}; 





export default auth0Config