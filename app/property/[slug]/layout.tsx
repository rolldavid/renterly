import styles from "@/styles/Property.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <div className={styles.propertyWrapper}>{children}</div>
    );
  }