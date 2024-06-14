import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar"; // Ensure Appbar is imported


export default function Blog(){
    const {id} = useParams();
    const {loading, blog} = useBlog(
       { id: id || ""}
    );

    if(loading || !blog){
        return(
            <div>
                <Spinner />
            </div>
        )
    }
    return(
        <div>
            <FullBlog blog={blog } /> 
        </div>
    )
}
