import passport from "passport"
import GooglePassport from "passport-google-oauth20"
import config from "./config/env.config.js"



const GoogleStrategy = GooglePassport.Strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_OAUTH_CLIENT_ID,
            clientSecret: config.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        function (accessToken, refreshToken, profile, callback) {
            callback(null, profile)
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

export default passport