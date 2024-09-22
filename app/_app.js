import { SessionProvider } from "next-auth/react";

export default function App({
  HomeComponent,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <HomeComponent {...pageProps} />
    </SessionProvider>
  );
}
