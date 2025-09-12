const PostGridDate = ({
  date,
  cssClasses,
}: {
  date: string;
  cssClasses?: string;
}) => (
  <time className={`text-12px font-inter ${cssClasses || ""}`}>
    {new Date(date).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </time>
);

export default PostGridDate;
