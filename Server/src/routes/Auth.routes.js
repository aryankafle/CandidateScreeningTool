import express from "express";
import passport from "passport";
import { CLIENT_IP } from "../util/ips.js";





const router = express.Router();



router.get("/login/success", (req, res) => {
    if(!req.user) {
        res.status(403).json({ 
            error: true,
            message: "Unauthorized" 
        })
        return;
    }

    res.status(200).json({
        error: false,
        message: "Successfully Logged In",
        user: req.user,
    })
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login Failure"
    })
})

router.get("/google/callback", 
    passport.authenticate("google", {
        successRedirect: CLIENT_IP,
        failureRedirect: "login/failed"
    })
)

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res, next) => {
    req.logout((error) => {
        if(error) { return next(error) }
        res.redirect(`${CLIENT_IP}/`)
    })
})



export default router;