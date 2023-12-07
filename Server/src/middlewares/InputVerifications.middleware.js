export const verifyOpenAIReqeust = (req, res, next) => {

    if(req.query.message && req.query.role) {

        if((typeof req.query.message != "string") || (typeof req.query.role != "string")) {
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