import express from "express";

import Auth from 'express-openid-connect/index.js'
const { requiresAuth } = Auth





const router = express.Router();



router.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});





export default router;