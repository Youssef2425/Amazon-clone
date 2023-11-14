import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { persistor, store } from '@/Redux-Toolkit/store';
import RootLayout from '@/components/RootLayout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <div className='font-bodyFont'>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <SessionProvider session={session}>
              <div className="font-bodyFont bg-gray-300">
                <RootLayout>
                  <Component {...pageProps} />
                </RootLayout>
              </div>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </div>
    </>
  )
}
