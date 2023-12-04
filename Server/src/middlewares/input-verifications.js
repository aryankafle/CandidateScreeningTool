export const verifyOpenAIReqeust = (req, res, next) => {

    if(req.message) {

        if(typeof req.message != "string") {
            return res.send(422).message(`OpenAI Error: message type must be string. Cannot process a ${typeof req.message}.`)
        }
        else {
            next();
        }

    }
    else {
        return res.send(404).message("OpenAI Error: message not found.")

    }
    
}