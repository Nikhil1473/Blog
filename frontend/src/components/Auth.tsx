import { ChangeEvent, useState } from "react";
import { signupInput } from "@nikhil_pradhan/medium-common"
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            console.error("Error while signing up/signing in:", error);
            alert('Error while signing up/signing in!'); // Basic error handling
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-96">
                <div className="text-center text-xl font-bold">
                    {type === "signup" ? "Create An Account" : "Sign In"}
                </div>
                <div className="text-center text-gray-500 text-sm mt-2 mb-4">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link to={type === "signin" ? "/signup" : "/signin"} className="underline ml-1">
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
                <LabelInput label="Name" placeholder="Enter your name" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }} />
                <LabelInput label="Email" placeholder="Enter your email" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />
                <LabelInput label="Password" type="password" placeholder="Enter your password" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={sendRequest} className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
                    {type === "signup" ? "Sign up" : "Sign in"}
                </button>
            </div>
        </div>
    );
};

interface LabelInputProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelInput({ label, placeholder, onChange, type }: LabelInputProps) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black">{label}</label>
            <input
                type={type || "text"}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
