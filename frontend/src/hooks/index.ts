import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface Blog{
    content:string;
    title:string;
    id:string;
    author:{
        name:string
    };
};

export const useBlogs = () => {
     
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem('token') || ''
                    }
                });
                setBlogs(response.data.post); // Adjust according to your API response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false); // Ensure loading state is set to false on error
            }
        };

        fetchBlogs();
    }, []);
    
    return {
        loading,
        blogs
    }
}

export const useBlog = ({id}:{id:string})=>{
    
    const [loading, setLoading] = useState(true);
        const [blog, setBlog] = useState<Blog>();
    
        
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token') || ''
                    }
                });
                setBlog(response.data.post); // Adjust according to your API response structure
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching blog ${id}:`, error);
                setLoading(false); // Ensure loading state is set to false on error
            }
        };

        fetchBlog();
    }, [id]); 
        
        return {
            loading,
            blog
        }
        
    }