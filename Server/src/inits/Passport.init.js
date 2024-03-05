import passport from "passport"
import PassportGoogle from "passport-google-oauth2"
import dotenv from "dotenv"

const GoogleStrategy = PassportGoogle.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"here use the clientID given by google",
        clientSecret:"here use the client secret given by google",
        callbackURL: "http://localhost:5000/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));