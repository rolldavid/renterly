
import styles from "@/styles/Home.module.css"
import "@/styles/globals.css"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import NavContainer from "./nav/components/NavContainer";
import Footer from "./footer/components/Footer";
import QueryProvider from "@/lib/providers/QueryProvider";
import ScrollToTop from "@/lib/utils/ScrollToTop";

export default async function RootLayout({ children }: {
    children: React.ReactNode;
  }) {

    return (
      <html lang="en">
        <body>
          
            <ScrollToTop />
            <UserProvider>
            <QueryProvider>
              <nav className={styles.nav}>
                  <NavContainer/>
              </nav>
              <main className={styles.main}>
                <div className={styles.content}>
                  {children}
                </div>
              </main>
              <footer className={styles.footer}>
                <Footer />
              </footer>
            </QueryProvider>
            </UserProvider>
        </body>
      </html>
    );
  }