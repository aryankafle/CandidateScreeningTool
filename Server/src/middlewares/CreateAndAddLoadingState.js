export async function appendLoadingState(req, res, next) {

    res.append("Loading-State", 
        JSON.stringify({
            batch: {}
        }
    ))

    next()

}