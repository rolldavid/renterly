
import styles from "@/styles/Home.module.css"
import "@/styles/globals.css"
import NavContainer from "./nav/components/NavContainer";

export default async function RootLayout({ children }: {
    children: React.ReactNode;
  }) {

    return (
      <html lang="en">
        <body>
            <main className={styles.container}>
                <section className={styles.nav}>
                      <NavContainer/>
                </section>
                <section className={styles.content}>
                    {children}
                </section>
            </main>
        </body>
      </html>
    );
  }