import dotenv from "dotenv"
dotenv.config

export default {
    OAuth: {
        clientID:     OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/home",
        passReqToCallback   : true
    }
}