import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex flex-col justify-center items-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"14th June 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
