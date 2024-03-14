import express from "express";
import passport from "passport";
import { addUser } from "../models/services/MongoDB.service.js";
import dotenv from "dotenv"
dotenv.config()




const router = express.Router();



router.get("/login/success", async (req, res) => {

    if(!req.user) {
        res.status(403).json({ 
            error: true,
            message: "Unauthorized" 
        })
        return;
    }



    try {

        await addUser(req.user)

    }
    catch (error) {

        res.status(400).json({
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
        successRedirect: process.env.CLIENT,
        failureRedirect: "login/failed"
    })
)

router.get("/google", passport.authenticate("google", ["profile", "email"]))

router.get("/logout", (req, res, next) => {

    req.logout((error) => {
        if(error) { return next(error) }
        res.redirect(`${process.env.CLIENT}/`)
    })
    
})



export default router;