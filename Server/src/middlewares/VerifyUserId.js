export const verifyUserId = (req, res, next) => {

    if(!(req.body?.userToken || req.query?.userToken)) {
        return res.status(400).send("userToken can't be undefined!")
    }

    console.log("ASDasdASDasd,", req.body?.userToken)

    next()
    
}