import "../styles/globals.css";
import Navbar from "../Components/Navbar/Navbar";
import AiMintsProvider from "../utils/AiMintsContext";

function MyApp({ Component, pageProps }) {
  return (
    <div className="global-container">
      <AiMintsProvider>
        <div className="glass-card">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </AiMintsProvider>
    </div>
  );
}

export default MyApp;
