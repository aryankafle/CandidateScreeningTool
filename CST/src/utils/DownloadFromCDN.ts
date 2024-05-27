export const downloadFileFromCDN = (file : File) => {
    
    const url = URL.createObjectURL(file)

    window.open(url)

};