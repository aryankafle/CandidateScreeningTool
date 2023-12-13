import googleStrategy from "../inits/OAuth.init.js"

export const authenticateUser = async (request, accessToken, refreshToken, profile, done) => {
    passport.use(googleStrategy())
}