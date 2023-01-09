import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FacebookCloneProvider } from "./context/FacebookContext";

function App() {
  return (
    <FacebookCloneProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </FacebookCloneProvider>
  );
}

export default App;
