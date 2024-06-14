import { ChangeEvent, useState } from "react";
import { signupInput, SignupType } from "@nikhil_pradhan/medium-common";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            console.log(e);
            alert('Error while signing up!');
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-xl font-bold">
                            {type === "signup" ? "Create An Account" : "Sign In"}
                        </div>
                        <div className="text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link to={type === "signin" ? "/signup" : "/signin"} className="underline ml-1">
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === 'signup' && (
                            <LabelInput label="Name" placeholder="Nikhil Kumar ...." onChange={(e) => {
                                setPostInputs(c => ({
                                    ...c,
                                    name: e.target.value
                                }));
                            }} />
                        )}
                        <LabelInput label="Username" placeholder="123@gmail.com" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                email: e.target.value // Update the email field
                            }));
                        }} />
                        <LabelInput label="Password" type="password" placeholder="12345678" onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value // Update the password field
                            }));
                        }} />
                        <button onClick={sendRequest} type="button" className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 w-96 font-medium rounded-lg text-sm p-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface LabelInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
};

function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
    return (
        <div className="w-96">
            <div>
                <label className="block mb-2 text-sm text-gray-900 dark:text-black font-semibold">{label}</label>
                <input type={type || "text"} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    );
}
