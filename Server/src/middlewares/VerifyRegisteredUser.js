import { client } from '../inits/MongoDB.init.js'





export const verifyUserRegistered = async (req, res, next) => {

    const userID = req.body?.userID || req.query?.userID



    const db = client.db("resumes")

    const users = db.collection("users")



    const isRegistered = await users.findOne({ _id: userID })

    if(!isRegistered) {

        return res.status(500).json({
            error: true,
            message: "User not registered!"
        })

    }



    next()
    
}
