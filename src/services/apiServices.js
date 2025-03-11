// Using AXIOS gives extra benifit over the above code
import axios from "axios";

export const sendMail = async (userEmail, mailData) => {
    try {
        if (!userEmail) {
            throw new Error("User email is required!");
        }    

        const sanitizedEmail = userEmail.replace(/\./g, "_");

        const { data } = await axios.post(
            `https://mailboxclient-b0975-default-rtdb.firebaseio.com/mails/${sanitizedEmail}.json`,
            mailData
        );

        return data; // Axios automatically parses JSON
    } 
    catch (error) {
        console.error("Error sending mail:", error);
        throw error;
    }
};