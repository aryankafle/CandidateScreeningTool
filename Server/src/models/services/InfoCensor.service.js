import { 

    censorPhone,
    censorEmail,

} from "../utils/TextCensor.js"





export async function censorContactInfo(textScan) {
    
    const censoredPhoneText = await censorPhone(textScan.text)
    const censoredEmailText = await censorEmail(censoredPhoneText.text)
    
    const contactInfo = {

        phoneNumber: censoredPhoneText.phoneNumber, 
        emailAddress: censoredEmailText.emailAddress,

    }


    return {

        text: censoredEmailText.text,
        contactInfo: contactInfo
        
    }

}

