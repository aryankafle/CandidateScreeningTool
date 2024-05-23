export const getUploadId = async (req, res) => {

    try {

        const fileID = req.file.id

        res.status(200).json({
        
            fileID,
            message: "Succesful Upload"
    
        })

    }
    catch (error) {

        res.status(500).json({

            error: true,
            message: "Could not get fileID."

        })

    }

}