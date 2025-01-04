import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from './store/userStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importing routing components
import Admin from "./components/Admin/Admin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>  {/* Wrapping the App with Router to enable routing */}
        <Routes>
          {/* Define the routes */}
          <Route path="/" element={<App />} />  {/* Default route */}
          <Route path="/admin" element={<Admin />} />  {/* Another view route */}
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
