import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage.jsx";
import { Login } from "./components/Login.jsx";
import { Register } from "./components/Register.jsx";
import { List } from "./components/Task-List/List.jsx";
import { SignInUp } from "./components/SignInUp.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UseCookieContext } from "./context/CookieContext.jsx";
function App() {
    return (
        <div className="App">
            <Router>
                <UseCookieContext>
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/SignInUp" element={<SignInUp />} />
                            {<Route path="/List" element={<List />} />}
                            <Route path="/Login" element={<Login />} />
                            <Route path="/Register" element={<Register />} />
                        </Routes>
                    </AuthProvider>
                </UseCookieContext>
            </Router>
        </div>
    );
}

export default App;
