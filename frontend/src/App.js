import "./App.css";
import Init from "./Start/init";
import Header from "./Start/header";
import Mainpage from "./Start/frontpage";
import Upload from "./Upload/check_status";
import Result from "./Upload/result";
import Allhis from "./History/all_his";
import Profile from "./Profile/profile";
import Register from "./Register/register";
import Calibrate from "./Calibrate/calibrate";
import TakeData from "./History/take_data";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <Init />
                        </div>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <div>
                            <Header />
                            <Mainpage />
                        </div>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <div>
                            <Header />
                            <Profile />
                        </div>
                    }
                />
                <Route
                    path="/calibrate"
                    element={
                        <div>
                            <Header />
                            <Calibrate />
                        </div>
                    }
                ></Route>
                <Route
                    path="/register"
                    element={
                        <div>
                            <Header />
                            <Register />
                        </div>
                    }
                />
                <Route
                    path="/test"
                    element={
                        <div>
                            <Header />
                            <Upload />
                        </div>
                    }
                />
                <Route
                    path="/result"
                    element={
                        <div>
                            <Header />
                            <Result />
                        </div>
                    }
                />
                <Route
                    path="/searchpatient"
                    element={
                        <div>
                            <Header />
                            <TakeData />
                        </div>
                    }
                />
                <Route
                    path="/allpatients"
                    element={
                        <div>
                            <Header />
                            <Allhis />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
