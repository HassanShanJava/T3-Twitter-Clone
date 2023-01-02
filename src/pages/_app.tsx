import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Container } from "../components/Container";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main>
        <Container>
          <Component {...pageProps} />
        </Container>
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
