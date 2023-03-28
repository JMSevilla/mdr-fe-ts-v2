import { ThemeProvider, createTheme } from '@mui/material/styles'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import AdminRegistrationContext from '../utils/context/base/AdminRegistrationContext'
import ToastContext from '../utils/context/base/ToastContext'
import { ControlledToast } from '@/components';
import './index.css'
import SessionContext from '@/utils/context/base/SessionContext';
import CssBaseline from '@mui/material/CssBaseline'
import 'react-quill/dist/quill.snow.css'
import TableSearchContext from '@/utils/context/base/TableSearchContext';
import { AuthProvider } from '@/utils/context/base/AuthContext';
import { useRefreshTokenHandler } from '@/utils/hooks/useRefreshTokenHandler';
export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  },
  
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  useRefreshTokenHandler()
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GoogleOAuthProvider clientId='643485254029-mmi46n2kojuce223b8cpfqkck1s4gv0c.apps.googleusercontent.com'>
        <AuthProvider>
        <TableSearchContext>
        <AdminRegistrationContext>
        <SessionContext>
        <ToastContext>
          <ControlledToast 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
          {getLayout(<Component {...pageProps} />)}
        </ToastContext>
        </SessionContext>
      </AdminRegistrationContext>
        </TableSearchContext>
        </AuthProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  )
}
