import React, { Component } from "react"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

type DocumentViewProps = {
    files : File[]
    index: number
}

type DocumentViewState = {
    files: File[]
}

class DocumentView extends Component<DocumentViewProps, DocumentViewState> {
    public readonly state : DocumentViewState = {
        files: []
    }

    

    componentDidUpdate(prevProps : DocumentViewProps) {
        if(prevProps.files !== this.props.files) {
          this.setState({files: this.props.files});
        }
    }

    render() {
        const selectedDocs = this.state.files.map((file) => ({
            uri: window.URL.createObjectURL(file),
            fileName: file.name,
        }))

        return (    
            <DocViewer
                documents={ selectedDocs }
                initialActiveDocument={ selectedDocs[this.props.index] }
                pluginRenderers={ DocViewerRenderers }
            />
        )
    }
}

export default DocumentView