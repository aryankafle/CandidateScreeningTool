export const useClipboard = () => {

    async function copyTextToClipboard(text : string, withAlert? : boolean) {
        try {
            await navigator.clipboard.writeText(text);
            if(withAlert) alert(`Text copied to clipboard: ${text}`);
        }
        catch (error) {
            if(withAlert) alert(`Error copying to clipboard!`);
            console.log(`Error copying to clipboard: ${text}`);
        }
    }





    
    return {

        copyTextToClipboard

    }
    
}