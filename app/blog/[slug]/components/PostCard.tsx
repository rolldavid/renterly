import { PostItem, PostList } from "./types";
import Link from "next/link";
import styles from "./PostCard.module.css";

export default function PostCard({ post }: {post: PostList}) {

  const readableDate = new Date(post.attributes.Date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


return (
        <Link className={styles.card} href={`/blog/${post.attributes.Slug}`}>
            <h2 className={styles.cardTitle}>{post.attributes.Title}</h2>
            <p className={styles.cardExcerpt}> {post.attributes.Description}</p>
            <p className={styles.cardDate}>{readableDate}</p>
        </Link>
    )

}
