import { doc, setDoc, Timestamp } from "firebase/firestore"
import { firestore } from "../configs/Firebase";
import Toast from "react-native-toast-message";

export interface IMessage {
    message: string,
    viewed: boolean,
    favorite: boolean,
    messageDate: Timestamp
    photoUrl: string,
    userId: string,
    userTo: string,
    wasItRead: boolean
}



export default class MessageQueue {
    private listOfMessages: Array<IMessage> = []
    private queuePosition: number = 0;

    constructor() {

    }

    public async deQueue():Promise<void> {
        try {
            const message = this.listOfMessages[this.queuePosition]
            const messageCreation = await setDoc(doc(firestore, 'messages', new Date().toString()), {
                message
            })
            this.queuePosition++ 
        } catch (err) {
            Toast.show({
                type:'error',
                text1:'Not possible sending message',
                text2:err
            })
        }

    }


    public isEmpty() {
        return this.queuePosition > this.listOfMessages.length
    }

    public enQueue(msg:IMessage){
        this.listOfMessages.push(msg)
    }


}