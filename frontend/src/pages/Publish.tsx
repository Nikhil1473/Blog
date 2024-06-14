import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handlePublish = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content },
                {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Error publishing post:", error);
            // Handle error appropriately (e.g., show user a message)
        }
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full pt-8">
                    <input
                        onChange={handleTitleChange}
                        type="text"
                        id="helper-text"
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500
                            focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Title"
                    />
                    <TextEditor onChange={handleContentChange} />
                    <button
                        onClick={handlePublish}
                        type="button" // Ensure type="button" unless in a form
                        className="inline-flex items-center px-5 py-2.5  w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div>
            <div>
                <div className="w-full mt-4 flex flex-col">
                    <div className="w-full mb-4 rounded-lg bg-gray-50 border">
                        <div className="px-4 py-2 bg-white rounded-b-lg">
                            <textarea
                                onChange={onChange}
                                rows={8}
                                className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white"
                                placeholder="Write an article..."
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
