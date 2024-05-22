

export function censorPhone(string) {
    
    const usPhoneNumRegex = /\s*(?:\+?(\d{1,3}))*([ ])*[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*/g
    const usPhoneNumRegex2 = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g
    const usPhoneNumRegex3 = /^(\+(([0-9]){1,2})[-.])?((((([0-9]){2,3})[-.]){1,2}([0-9]{4,10}))|([0-9]{10}))$/g

    const phone = string.match(usPhoneNumRegex)

    if (!usPhoneNumRegex.test(string)) return {text: string, phoneNumber: ""}
    

    const text = string.replaceAll(usPhoneNumRegex, "555-132-9394")

    const censor = {
        text: text,
        phoneNumber: phone[0]    
    }

    return censor
    
}





export function censorEmail(string) {

    const usEmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
    
    const email = string.match(usEmailRegex)

    if (!usEmailRegex.test(string)) return {text: string, emailAddress: "No email found"}

    const text = string.replaceAll(usEmailRegex, "grum.business@gmail.com")
    
    const censor = {
        text: text,
        emailAddress: email[0]    
    }

    return censor

}









