import styles from "@/styles/Home.module.css"
export default async function Layout({ children }: {
    children: React.ReactNode;
  }) {
 
    return (
        <>{children}</>
    );
  }

  export const dynamic = "force-dynamic"