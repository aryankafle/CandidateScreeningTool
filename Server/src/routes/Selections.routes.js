import express from "express";



import {

    getAllUserSavedLists,
    getUserSavedSelection,
    setUserSavedSelection

} from "../controllers/Selections.controller.js";





const router = express.Router();



router.get("/get-all-user-saved-lists", getAllUserSavedLists)
router.get("/get-user-saved-selection", getUserSavedSelection)
router.post("/set-user-saved-selection", setUserSavedSelection)





export default router;