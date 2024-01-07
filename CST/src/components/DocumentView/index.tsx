import React, { Component } from "react"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"

type DocumentViewProps = {
    files : File[]
    index: number
}

type DocumentViewState = {
    files: File[]
    index: number
}

class DocumentView extends Component<DocumentViewProps, DocumentViewState> {
    public readonly state : DocumentViewState = {
        files: this.props.files,
        index: this.props.index
    }

    

    componentDidUpdate(prevProps : DocumentViewProps) {
        if(prevProps.files !== this.props.files) {
          this.setState({files: this.props.files, index: this.props.index});
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
                activeDocument={ selectedDocs[this.state.index] }
                pluginRenderers={ DocViewerRenderers }
            />
        )
    }
}

export default DocumentView