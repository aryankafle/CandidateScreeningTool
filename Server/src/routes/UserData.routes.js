import express from "express";



import {

    getUserSavedSelection,
    setUserSavedSelection,

    getAllUserSavedLists,

} from "../controllers/UserData.controller.js";





const router = express.Router();



router.get("/get-user-selection", getUserSavedSelection)
router.put("/set-user-selection", setUserSavedSelection)

router.get("/get-user-lists", getAllUserSavedLists)





export default router;