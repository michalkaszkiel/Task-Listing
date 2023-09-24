import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage.jsx";
import { List } from "./components/List.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/list" element={<List />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
