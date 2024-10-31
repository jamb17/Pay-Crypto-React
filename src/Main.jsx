import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./routes/Route.jsx";
import './styles/css/index.css';
import gsap from "gsap";

gsap.defaults({
    ease: "elastic.out(1,0.9)",
    duration: 1
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);