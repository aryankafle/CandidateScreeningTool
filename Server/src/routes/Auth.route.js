import express from "express";
import requiresAuth from "express-openid-connect";
import Auth from 'express-openid-connect'





const router = express.Router();





router.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

export default router;