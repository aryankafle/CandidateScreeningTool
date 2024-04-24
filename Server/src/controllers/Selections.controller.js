import { getUserSavedLists, getUserSelection, setUserSelection, addSavedList, removeSavedList, downloadFile } from "../models/services/MongoDB.service.js"





export const getAllUserSavedLists = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getAllUserSavedLists`)

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





    console.log("Controller function finished.\n\n\n")

}

export const getResumeFile = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getResumeFile`)

    const fileID = req.query?.fileID;





    try {

        const file = await downloadFile(fileID)

        res.status(200).send(file)

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: "Error downloading resume file."

        })

    }





    console.log("Controller function finished.\n\n\n")

}





export const getUserSavedSelection = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async getUserSavedSelection`)





    try {

        const savedSelection = await getUserSelection(req.query?.userID)

        console.log(savedSelection)

        res.status(200).send(savedSelection)

    }
    catch (error) {

        res.status(500).json({
            error: error,
            message: "Error getting user saved selection."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")

}





export const setUserSavedSelection = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async setUserSavedSelection`)





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

        console.log("Error setting user saved selection: ", error)

        res.status(500).json({
            error: error,
            message: "Error setting user saved selection."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")
    
}





export const addNewSavedList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async addNewSavedList`)





    try {

        await addSavedList(req.body?.userID, req.body?.savedList)

        res.status(200).json({
            error: false,
            message: "Successfully added saved list."
        })

    }
    catch (error) {

        console.log("Error adding saved list: ", error)

        res.status(500).json({
            error: error,
            message: "Error adding saved list."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")

}





export const removeOldSavedList = async (req, res) => {

    console.log(`\n\n\nUsing Controller: async removeOldSavedList`)





    try {

        await removeSavedList(req.body?.listID)

        res.status(200).json({
            error: false,
            message: "Successfully removed saved list."
        })

    }
    catch (error) {

        console.log("Error removing saved list: ", error)

        res.status(500).json({
            error: error,
            message: "Error removing saved list."
        })

    }
    

    


    console.log("Controller function finished.\n\n\n")

}