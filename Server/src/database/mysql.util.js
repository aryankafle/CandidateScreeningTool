/*
DO NOT use this function within a controller
This is to avoid potential SQL injections
It technically should be fine, but no chances bruh
DO NOT EVER EVER EVER use the prepare function within a controller.
*/
export const useSQL = (db, sql, params = []) => {
    db.prepare(sql, params)
}

export const viewSQL = (db, sql) => {
    return db.query(sql, (err, results, fields) => {
        if(err) {
            throw err
        } else {
            return {
                results: results,
                fields: fields
            }
        }
    })
}