export const verifyOpenAIReqeust = (req, res, next) => {

    if(req.query.message) {

        if(typeof req.query.message != "string") {
            return res.sendStatus(404).send("message not a string")
        }
        else {
            next();
        }

    }
    else {
        return res.sendStatus(404).send("message not found")

    }
    
}