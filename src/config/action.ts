import Cryptr from "cryptr";
import Env from "./env";

const cryptr = new Cryptr(Env.SECRET_KEY);

interface EmailProps {
    email:string
}
export const encryptEmail = async (props:EmailProps) =>{
    const encryptedemail = cryptr.encrypt(props.email);
    return encryptedemail;
}
export const decryptEmail = async (props:EmailProps) =>{
    const decryptedEmail = cryptr.decrypt(props.email);
    return decryptedEmail;

}
