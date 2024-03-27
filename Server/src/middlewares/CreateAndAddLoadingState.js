export async function addUploadLoadingState(req, res, next) {

    res.append("Loading-State", 
        JSON.stringify({
            batchLength: Infinity,
            numUploaded: 0,
        }
    ))

    next()

}

export async function addFilteringLoadingState(req, res, next) {

    res.append("Loading-State", 
        JSON.stringify({
            batchLength: Infinity,
            numFilesFiltered: 0,
            currentFile: {
                currentFilter: {
                    type: "",
                    name: ""
                },
                filterListLength: Infinity,
                numFiltersUsed: 0
            }
        }
    ))

    next()

}

