import express from "express";

import dotenv from "dotenv";
dotenv.config()

import cors from "cors";
import multer from "multer"
import auth0Config from "./config/auth0.config.js"
import { auth } from 'express-openid-connect'
import cookieSession from "cookie-session"
import passport from "passport"
import PassportGoogle from "passport-google-oauth2"



import { SERVER_PORT } from "./util/ips.js";

import { corsConfig } from "./config/cors.config.js";

import { 

    authRoutes, 

    resumeFilteringRoutes, 
    uploadRoutes, 

    testRoutes,

} from "./routes/index.js"





const app = express();

app.use(
    cors({
      origin: [
  "http://localhost:3000"
     ],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
  );
app.use(express.json());




const isLoggedIn = (req, res, next) => {
    if (req.user) {
    next();
    } else {
    res.sendStatus(401);
    }
    }




const GoogleStrategy = PassportGoogle.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));

app.use(cookieSession({
    name: "google-auth-session",
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        req.session.redirectPath = req.query.redirectUrl
        res.redirect('/success')

    }
);



app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
    })





// app.use(auth(auth0Config));
app.use("/auth", authRoutes)

// app.use(requiresAuth());





const storage = multer.memoryStorage()
const upload = multer({
    storage: storage
});

app.use("/uploads", upload.array("files"), uploadRoutes)
app.use("/resume-filtering", resumeFilteringRoutes)

app.use("/test", testRoutes)



app.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})


app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success",isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.email}`)
})




app.get("/ping", (req, res) => {
    res.status(200).json({message: "pong"})
});

app.get("/", (req, res) => {
    res.status(200).json({message: "Archnatin CST Back-end Server"})
})





app.listen(SERVER_PORT, () => {
    console.log(`Express is running and server is listening on ${SERVER_PORT}`)
});