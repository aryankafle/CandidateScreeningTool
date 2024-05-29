import {
    censorEmail,
    censorPhone,
} from "../utils/TextCensor.js"





export async function censorContactInfo(textScan) {
    
    const censoredPhoneInfo = censorPhone(textScan)
    const censoredEmailInfo = censorEmail(censoredPhoneInfo.text)
    
    const contactInfo = {

        phoneNumber: censoredPhoneInfo.phoneNumber, 
        emailAddress: censoredEmailInfo.emailAddress,

    }

    return {

        text: censoredEmailInfo.text,
        contactInfo: contactInfo
        
    }

}

