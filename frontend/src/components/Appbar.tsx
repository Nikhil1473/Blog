import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = ()=>{
    return (
        <div className="border-b flex justify-between px-10 py-4 ">
            <Link to={'/blogs'} className ="flex flex-col justify-center" >
                 Medium
            </Link>
            
            <div className="flex">
                <div className="mt-1">
                    <Link to={`/publish`} >
                    <button type="button" className="text-white bg-green-700
                    hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
                    font-medium rounded-full text-sm px-5 py-2.5 text-center mr-6
                        me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
                        dark:focus:ring-green-800">New</button>
                    </Link>  
                </div>
                <div>
                    <Link to={`/signin`} >
                    <button type="button" className="text-white bg-green-700
                    hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
                    font-medium rounded-full text-sm px-5 py-2.5 text-center mr-6
                        me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
                        dark:focus:ring-green-800">Logout</button>
                    </Link>    
                    <Avatar name={"Nikhil"} size={"big"}/>
                </div>
            </div>
        </div>
    )
}