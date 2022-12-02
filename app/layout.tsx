
import styles from "@/styles/Home.module.css"
import "@/styles/globals.css"
import NavContainer from "./nav/components/NavContainer";
import QueryProvider from "@/lib/providers/QueryProvider";

export default async function RootLayout({ children }: {
    children: React.ReactNode;
  }) {

    return (
      <html lang="en">
        <body>
            <QueryProvider>
              <main className={styles.container}>
                  <section className={styles.nav}>
                        <NavContainer/>
                  </section>
                  <section className={styles.content}>
                      {children}
                  </section>
              </main>
            </QueryProvider>
        </body>
      </html>
    );
  }