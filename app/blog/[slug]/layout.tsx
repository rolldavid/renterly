import styles from "@/styles/Post.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <div className={styles.container}>{children}</div>
    );
  }