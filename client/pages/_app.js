import '../styles/globals.css'
import Navbar from '../Components/Navbar/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div className="global-container">
  <div className='glass-card'>
  <Navbar />
  <Component {...pageProps} />

  </div>
    </div>
  )
}

export default MyApp
