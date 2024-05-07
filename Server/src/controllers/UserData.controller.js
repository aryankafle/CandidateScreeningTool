import { 

    getUserSavedLists,
    getUserSelection,
    setUserSelection,

} from "../models/services/UserAccounts.service.js"





export const getAllUserSavedLists = async (req, res) => {

    (`\n\n\nUsing Controller: async getAllUserSavedLists`)

    const userID = req.query?.userID





    try {

        const savedLists = await getUserSavedLists(userID)

        res.status(200).send(savedLists)

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: "Error getting user saved lists."

        })

    }

}





export const getUserSavedSelection = async (req, res) => {

    try {

        const savedSelection = await getUserSelection(req.query?.userID)

        res.status(200).send(savedSelection)

    }
    catch (error) {

        res.status(500).json({
            error: error,
            message: "Error getting user saved selection."
        })

    }
    
}



export const setUserSavedSelection = async (req, res) => {

    try {

        await setUserSelection(req.body?.userID,
            {

                location: req.body?.location || null,
                currentSavedList: req.body?.currentSavedList || null,

            }
        )

        res.status(200).json({
            error: false,
            message: "Successfully set user saved selection."
        })

    }
    catch (error) {

        res.status(500).json({
            error: error,
            message: "Error setting user saved selection."
        })

    }
        
}