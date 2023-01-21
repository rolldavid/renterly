import { PostList } from "./types"
import Image from "next/image";
import ReactMarkdown, { Components } from "react-markdown";
import styles from "./PostContent.module.css"

export default function PostContent({ post }: { post: PostList }) {
    const readableDate = new Date(post.attributes.Date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const MarkdownComponents: object = {
        p: (paragraph: any) => {
          const { node } = paragraph;
    
          if (node.children[0].tagName === "img") {
            const image = node.children[0];
    
            return (
              <div className={styles.imageContainer}>
                <Image
                  src={image.properties.src}
                  width="500"
                  height="300"
                  alt={image.properties.alt}
                  className={styles.image}
                />
              </div>
            );
          }
          return <p>{paragraph.children}</p>;
        },
      };
    
    return (
        <div className={styles.container}>
            <section className={styles.postContainer}>
            
                <div className={styles.titleContainer}><h1 className={styles.title}>{post.attributes.Title}</h1></div>
                <div className={styles.subtitleContainer}>
                    <div className={styles.date}>
                        {readableDate}
                    </div>
                    <div className={styles.author}>
                        {` |  ${post.attributes.Author}`}
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <ReactMarkdown components={MarkdownComponents}>
                        {post.attributes.Content}
                    </ReactMarkdown>
                </div>
            </section>
        </div>
    )
}