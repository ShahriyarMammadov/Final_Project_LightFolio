import { useState } from "react";
import "./App.css";
import networkErrorImage from "./assets/images/network error.png";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes";

function App() {
  const [online, setOnline] = useState(true);

  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });

  const router = createBrowserRouter(ROUTES);

  return (
    <div className="App">
      {online ? (
        <RouterProvider router={router}></RouterProvider>
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
