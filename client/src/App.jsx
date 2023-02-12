import { useState } from "react";
import "./App.css";
import Router from "./routes";
import networkErrorImage from "./assets/images/network error.png";

function App() {
  const [online, setOnline] = useState(true);

  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });

  return (
    <div className="App">
      {online ? (
        <Router />
      ) : (
        <>
          <img
            style={{ width: "40%", height: "85vh", margin: "0 auto" }}
            src={networkErrorImage}
            alt="network error"
          />
          <h1 style={{ textAlign: "center" }}>
            Please check your internet connection!!!
          </h1>
        </>
      )}
    </div>
  );
}

export default App;
