import express from "express";
import passport from "passport";
import config from "../config/env.config.js";
import { addUser } from "../models/services/UserAccounts.service.js";





const router = express.Router();



router.get("/login/success", async (req, res) => {

    if(!req.user) {
        
        return res.status(403).json({ 
            error: true,
            message: "Unauthorized" 
        })
        
    }



    try {

        await addUser(req.user)

    }
    catch (error) {

        return res.status(400).json({
            error: error,
            message: "Error adding user to user table."
        })
    
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
        successRedirect: config.CLIENT,
        failureRedirect: "login/failed"
    })

)

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res, next) => {

    req.logout((error) => {

        if(error) { return next(error) }
        res.redirect(`${config.CLIENT}/`)

    })
    
})



export default router;