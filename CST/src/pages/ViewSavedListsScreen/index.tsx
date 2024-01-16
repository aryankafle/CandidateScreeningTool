import {useState } from "react";
import Input from '../../components/TextBox'
//import { PackContext } from "../../context/PackContext";
let nextId = 0;

const ViewSavedPacksScreen = () => {
    
    type FileContextType = {
        uploadedFiles: string[]
        chosenFiles: string[]
        setUploadedFiles: React.Dispatch<React.SetStateAction<string[]>>
        setChosenFiles: React.Dispatch<React.SetStateAction<string[]>>
    }



    const [nameInput, setNameInput] = useState("");
    const onChange = (str: string) => {
        setNameInput(str);
    };

    const [uploadedFiles, setUploadedFiles] = useState([] as string[])
    const [selectedFiles, setSelectedFiles] = useState([] as string[])
    




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const uniqueFiles = [...new Set([...uploadedFiles, nameInput])]
        setNameInput("");
        setUploadedFiles(uniqueFiles)
    }

    function sendToLink(file : string) {
        //YADA YADA do something with routing here to send link brrrrr
    }



    const FileCard =  (props: {file: string}) => {
        return (
            <div className="flex flex-row justify-between px-[2rem] overflow-x-hidden"
                onClick={(e) => {
                    sendToLink(props.file)
                }}>
                {props.file}
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
       <div className="dark:bg-blue bg-white justify-center
                        w-screen flex flex-col">
            
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
        </div>

    )
           
    
}
export default ViewSavedPacksScreen