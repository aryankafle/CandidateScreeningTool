import React from "react"
import DocViewer, { DocViewerRenderers } from "react-doc-viewer"

type DocumentViewProps = {
    selectedDocs : File[]
}

export const DocumentView : React.FC<DocumentViewProps> = (props : DocumentViewProps) => {
    
    return (
        <DocViewer
            documents={
                props.selectedDocs.map((file) => ({
                    uri: window.URL.createObjectURL(file),
                    fileName: file.name,
                }))
            }
            pluginRenderers={DocViewerRenderers}
        />
    )
}