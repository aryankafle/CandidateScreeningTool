import express from "express";



import {

    getAllUserSavedLists,
    getUserSavedSelection,
    setUserSavedSelection,
    addNewSavedList,
    removeOldSavedList

} from "../controllers/Selections.controller.js";





const router = express.Router();



router.get("/get-user-lists", getAllUserSavedLists)
router.post("/create-list", addNewSavedList)
router.put("/remove-list", removeOldSavedList)

router.get("/get-user-selection", getUserSavedSelection)
router.put("/set-user-selection", setUserSavedSelection)





export default router;