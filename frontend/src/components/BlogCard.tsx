import { Link } from "react-router-dom";

interface BlogCardProps{
authorName:string,
title:string,
content:string, 
publishedDate:string;
id:string;

};

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}:BlogCardProps)=>{

    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b cursor-pointer border-slate-300 p-4 m-2 w-screen max-w-screen-md  ">
                <div className="flex">
                    <div className="">
                        <Avatar name={authorName} size={"small"} /> 
                    </div>
                <div className=" font-extralight pl-2 text-sm flex flex-col justify-center">
                    {authorName} 
                </div>
                <div className="text-sm flex justify-center items-center pl-2 ">
                        {/* to represent the dot  */}
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-slate-400 text-sm flex flex-col justify-center">
                    {publishedDate}
                </div>
                
                </div>
                <div className="text-2xl font-semibold mt-2 mb-1">
                    {title}
                </div>
                <div className=" font-thin text-lg">
                    {content.slice(0,200)+ "..."}
                </div>
                <div className="text-slate-400 font-thin text-xs mt-7">
                    {Math.ceil(content.length /100)} min read
                </div>
                
    
            </div>
        </Link>
        
    )
}

function Circle(){
    return(
        <div className="h-1 w-1 rounded-full bg-slate-400  ">
    
        </div>
    )
}

export function Avatar({name, size = "small"}: {name:string, size?:string}){
    return (
    <div className={`relative  inline-flex items-center justify-center 
     overflow-hidden ${size === "small"? "w-6 h-6" :"w-10 h-10"}
      bg-gray-100 rounded-full dark:bg-gray-600`}>

        <span className={`${size === "small"? "text-xs" :"text-lg"} font-normal text-gray-600
         dark:text-gray-300`}>{name[0]}</span>
            
    </div>
    )
}