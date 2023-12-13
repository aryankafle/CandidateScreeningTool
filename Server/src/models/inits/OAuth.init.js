import authConfig from "../../config/oauth.config.js"
const passport = require( 'passport-google-oauth2' )
const GoogleStrategy = passport.Strategy


export default new GoogleStrategy(
    authConfig,
    (request, accessToken, refreshToken, profile, done) =>
        {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        })