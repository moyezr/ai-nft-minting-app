import "../styles/globals.css";
import Navbar from "../Components/Navbar/Navbar";
import DeDevsProvider from "../utils/DeDevsContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="global-container">
      <DeDevsProvider>
        <div className="glass-card">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </DeDevsProvider>
    </div>
  );
}

export default MyApp;
