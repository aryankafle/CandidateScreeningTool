import { Key, useContext, useEffect, useState } from "react";
import Input from '../../components/TextBox'
import { PackContext } from "../../context/PackContext";
import { cloudUploadOutline } from 'ionicons/icons';
import { IonIcon } from "@ionic/react"
let nextId = 0;

const ViewSavedPacksScreen = () => {
    const [nameInput, setNameInput] = useState("");
    const onChange = (str: string) => {
        setNameInput(str);
    };
    const [uploadedFiles, setUploadedFiles] = useState([] as string[])

    // const packContext = useContext(PackContext)
    // const uploadedPacks = packContext.uploadedPacks
    // const setUploadedPacks = packContext.setUploadedPacks
    // const setChosenPacks = packContext.setUploadedPacks

    // const [selectedPacks, setSelectedPacks] = useState([] as string[])
    // const [previouslySelected, setPreviouslySelected] = useState("")
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const pack = "Pack " + Math.floor(Math.random() * 100)

        const uniquePacks = [...new Set([...uploadedFiles, pack])]
        console.log(uniquePacks)
        //setUploadedPacks(uniquePacks)
    }


      
    // const PackCard =  (props: {pack: string}) => {
    //     return (
    //         <div className="flex flex-row justify-between px-[2rem] overflow-x-hidden">
    //             {props.pack}
    //         </div>
    //     )
    // }

    
    // const ListCard = (props: {pack: string}) => {
    //     return (
    //         selectedPacks.includes(props.pack) ? 
    //             <div className="text-red border-red
    //                             dark:text-red dark:border-red
    //                             text-center border-[0.1rem] flex-grow cursor-pointer select-none">
    //                 <PackCard pack={props.pack}/>
    //             </div>

    //         :
    //             <div className="text-black border-black
    //                                 dark:text-white dark:border-white
    //                                 text-center border-[0.1rem] flex-grow cursor-pointer select-none">
    //                     <PackCard pack={props.pack}/>
    //             </div>
    //     )
        
    // }


    return(
        //<div>
       <div className="dark:bg-blue bg-white justify-center
                        w-screen flex flex-col">
            <form onSubmit = {handleSubmit}>
                <Input
                    onChange={onChange}
                    name="name"
                    placeholder="Enter your name"
                    value={nameInput}
                    //onkeypress= "handleEnterKey(event)"
                />    
                <button type="submit">Submit</button> 
            </form >
            {/* <button onClick = {() => {
                setArtists([ ...artists, {id: nextId++, name :name}]);
                
            
            }}> Add </button>
            <ul> */}
            
       
            
            {/* <div className="flex justify-center">
            <button className="dark:border-white dark:text-white
                                border-black text-black
                                border-[0.1rem] flex justify-between gap-[0.5rem] p-[0.7rem] mt-[1.5rem]"
                onClick={handleUploadClick} >
                <IonIcon className = "pt-[0.3rem]" icon = {cloudUploadOutline}></IonIcon>
                <div>
                    Upload New Packs
                </div>
            </button>
        </div> */}
            {/* <div className="flex flex-grow flex-col mt-[1.5rem]">
                <ol className="border-black self-center flex-grow
                                dark:border-white
                                border-[0.1rem] w-[35rem] max-h-[50vh] min-h-[8rem] overflow-y-scroll">
                    {uploadedPacks.map((pack : string, index : number) => <li key={index}><ListCard pack={pack}></ListCard></li>)}
                </ol>
                {
                selectedPacks.length > 0 ?
                    <>
                    <div className="pt-[0.2rem] self-center cursor-pointer select-none" onClick={() => { setSelectedPacks([]) } }>
                                Clear Selection
                    </div>
                    </>
                :
                    <></>
                }
                
            </div> */}
        </div>

    )
           
    
}
export default ViewSavedPacksScreen