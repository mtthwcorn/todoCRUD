import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthContext'
import '../styles/globals.css'

// important distinction - the index.js file is the home page in next js i.e. localhost:300/
// the app.js is the entry point 
// Therefore, treat the index.js as a home page, and the app.js as an entry point wherein lies important component tags such as layout 

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
