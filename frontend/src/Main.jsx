import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./routes/Route.jsx";
import './styles/index.sass';
import gsap from "gsap";
import { ErrorProvider } from "./ErrorContext.jsx";
import ErrorComponent from "./Features/components/ErrorComponent.jsx";
import { ThemeProvider } from "./ThemeContext.jsx";
import ThemeComponent from "./Features/components/ThemeComponent.jsx";

gsap.defaults({
    ease: "elastic.out(1,0.9)",
    duration: 1
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <ErrorProvider>
                    <ErrorComponent />
                    <ThemeComponent />
                    <App />
                </ErrorProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);