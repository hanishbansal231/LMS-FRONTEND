import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/RegexMatcher";
import axiosInstance from "../Helpers/axioxInstance";

function Contact() {
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    });
    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are mandatory");
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid email id");
            return;
        }
        try{
            const response = axiosInstance.post("/contact", {...userInput});
            toast.promise(response,{
                loading:"Submitting your message",
                success:"Form submitted successfully",
                error:"Failed to submit the form",
            });
            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
            
        }catch(Error){
            toast.error("Operation failed...")
        }
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form noValidate onSubmit={onFormSubmit} className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                    <h2 className="text-3xl font-semibold">Contact Form</h2>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                        <input
                            type="text"
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={userInput.name}
                            onChange={handelInputChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">Email</label>
                        <input
                            type="email"
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={userInput.email}
                            onChange={handelInputChange}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">Message</label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            value={userInput.message}
                            onChange={handelInputChange}
                        />
                    </div>
                    <button className="w-full py-2 font-semibold cursor-pointer text-xl rounded-sm bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 ease-in-out" type="submit">Submit</button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default Contact;