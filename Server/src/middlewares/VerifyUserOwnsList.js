import { client } from '../inits/MongoDB.init.js'





export const verifyUserOwnsList = async (req, res, next) => {

    const userID = req.body?.userID || req.query?.userID
    const listID = req.body?.listID || req.query?.listID


    
    const db = client.db("resumes")

    const listTable = db.collection("saved-lists")



    const savedList = await listTable.findOne({ _id: listID })

    console.log(savedList)

    if(! (savedList?.user_id === userID) ) {

        return res.status(500).json({
            error: true,
            message: "This user does not own this list!"
        })

    }



    next()
    
}
