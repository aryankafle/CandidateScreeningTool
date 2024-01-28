import {useState } from "react";
import Input from '../../components/forms/TextBox'
import { useSelectableList } from "../../hooks/SelectableList";
import Button from '../../components/buttons/ImprovedButtonComponent'





const ViewSavedPacksScreen = () => {

    const [nameInput, setNameInput] = useState("");

    const [uploadedFiles, setUploadedFiles] = useState([] as string[])

    const [selectedFiles, setSelectedFiles] = useState([] as string[])

    const [showModal, setShowModal] = useState(false)

    const [currentlyOpenedIndex, setCurrentlyOpenedIndex] = useState(0)

    const {

        selectableItems,

        clearSelection,
        selectAll,
        removeCurrentSelectionFromList,
        
        handleSelectionOnKeyDown,
        handleSelectionOnClick

    } = useSelectableList<string>(uploadedFiles, setUploadedFiles)





    const onChange = (str: string) => {
        setNameInput(str);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const uniqueFiles = [...new Set([...uploadedFiles, nameInput])]
        setNameInput("");
        setUploadedFiles(uniqueFiles)
    }

    function sendToLink(file : string) {
        window.location.href = file;
    }


    
    const FileCard =  (props: {file: string}) => {
        return (
            <div className="flex flex-row justify-between px-[2rem] overflow-x-hidden">
                <div>
                    {/* className={
                            selectableItems[props.index].isSelected ?
                                `text-red border-red
                                dark:text-red
                                flex-grow select-none cursor-pointer`
                            :
                                `text-black border-black
                                dark:text-white
                                flex-grow select-none cursor-pointer`
                        } */}
                    {props.file}
                </div>
                <div
                    className="cursor-pointer select-none"
                    onClick={() => {sendToLink(props.file)}}
                >
                    Open Link
                </div>
            </div>
        )
    }

    const ListCard = (props: {file: string}) => {
        return (
            selectedFiles.includes(props.file) ? 
                <div className="text-red border-red
                                dark:text-red dark:border-red
                                text-center border-[0.1rem] flex-grow cursor-pointer select-none">
                                
                    <FileCard file={props.file}/>
                </div>

            :
                <div className="text-black border-black
                                    dark:text-white dark:border-white
                                    text-center border-[0.1rem] flex-grow cursor-pointer select-none">
                        <FileCard file={props.file}/>
                </div>
        )
        
    }
      


    return(
       <div className=" dark:bg-blue bg-white justify-center
                        flex flex-grow flex-col">
            
            <form onSubmit = {handleSubmit}>
                <div className="flex justify-center p-[0.9rem]">
                    <Input
                        onChange={onChange}
                        name="name"
                        placeholder="Enter Link"
                        value={nameInput}/>  
                </div> 
                <div className="flex justify-center">
                    <button className="dark:border-white dark:text-white
                                    border-black text-black
                                    border-[0.1rem] flex justify-between gap-[0.5erm] p-[0.7rem] mt-[0.4rem]"
                    type="submit">
                        <div> 
                            Submit Link
                        </div>
                        
                    </button> 
                </div>
            </form >
            <div className="flex flex-grow flex-col mt-[1.5rem]">
                <ol className="border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] w-[35rem] max-h-[50vh] min-h-[8rem] overflow-y-scroll">
                    {uploadedFiles.map((file : string, index : number) => <li key={index}><ListCard file={file}></ListCard></li>)}
                </ol>
            </div>
            <div className="h-[5rem]
                                text-black
                                dark: text-white
                                self-center">
                    {selectableItems.some((selectable) => selectable.isSelected) ?
                        <div className="flex flex-col my-[1rem]">
                            <Button
                                className=" text-black
                                            dark: text-white
                                            flex-grow self-center"
                                onClick={() => { removeCurrentSelectionFromList(); } }
                            >
                                            Remove Selected Files
                            </Button>
                            <Button
                                className=" text-black
                                            dark: text-white
                                            flex-grow self-center"
                                onClick={() => { clearSelection(); } }
                            >
                                            Clear Selection
                            </Button>
                        </div>
                    :
                        <Button onClick={() => selectAll()}
                                className="my-[1.5rem]"
                        >
                            { selectableItems.length > 0 ? "Select All" : ""}
                        </Button>
                    }
                </div>
        </div>

    )
           
    
}
export default ViewSavedPacksScreen