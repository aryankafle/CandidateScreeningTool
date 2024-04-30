import { censorPhone } from "../utils/TextCensor.js"
import { censorEmail } from "../utils/TextCensor.js"


export async function censorContactInfo(scan) {
    
    const censoredPhoneText = await censorPhone(scan.text)
    
    const censoredEmailText = await censorEmail(censoredPhoneText.text)
    
    const contactInfo = {
        phoneNumber: censoredPhoneText.phoneNumber, 
        emailAddress: censoredEmailText.emailAddress
    }


    return { text: censoredEmailText.text, fileName: scan.fileName, contactInfo: contactInfo}

}

