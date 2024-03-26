export async function addUploadLoadingState(req, res, next) {

    req.write({
        loadingState: {
            batchLength: Infinity,
            numUploaded: 0,
            currentUpload: {
                name: "",
                scanned: false,
                uploaded: false
            }
        }
    })

    next()

}

export async function addFilteringLoadingState(req, res, next) {

    req.write({
        loadingState: {
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
    })

    next()

}

