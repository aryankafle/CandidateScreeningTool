import express from "express";



import {

    getAllUserSavedLists,
    getUserSavedSelection,
    setUserSavedSelection,
    addNewSavedList,
    removeOldSavedList

} from "../controllers/Selections.controller.js";

import {
    verifyUserOwnsList
} from "../middlewares/authorization/VerifyUserOwnsList.js"





const router = express.Router();



router.get("/get-all-user-saved-lists", getAllUserSavedLists)
router.post("/add-saved-list", addNewSavedList)
router.post("/remove-saved-list", verifyUserOwnsList, removeOldSavedList)

router.get("/get-user-saved-selection", getUserSavedSelection)
router.post("/set-user-saved-selection", setUserSavedSelection)





export default router;