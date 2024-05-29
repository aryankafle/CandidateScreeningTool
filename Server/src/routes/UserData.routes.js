import express from "express";



import {
    getAllUserSavedLists,

    getUserExternalList,
    getUserSavedSelection,
    setUserSavedSelection
} from "../controllers/UserData.controller.js";





const router = express.Router();



router.get("/get-user-selection", getUserSavedSelection)
router.put("/set-user-selection", setUserSavedSelection)

router.get("/get-user-lists", getAllUserSavedLists)

router.get("/get-external-list", getUserExternalList)





export default router;