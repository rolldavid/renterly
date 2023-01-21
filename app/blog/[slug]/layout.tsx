import styles from "@/styles/Blog.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <div className={styles.container}>{children}</div>
    );
  }