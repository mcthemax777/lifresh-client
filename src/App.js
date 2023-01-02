import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './ui/pages/LoginPage';
import DaySchedulePage from './ui/pages/SchedulePage';
import MainPage from './ui/pages/MainPage';
import Login from "./Login";

export const AppContext = React.createContext()

function App () {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [sid, setSId] = useState("");
    const [data, setData] = useState("{}");
    const [scheduleTaskList, setScheduleTaskList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);

    const store = {
        id, password, setId, setPassword, sid, setSId, data, setData, scheduleTaskList, setScheduleTaskList, moneyTaskList, setMoneyTaskList
    }

    return (
        <AppContext.Provider value={store}>
            <div className="App">
                <Router>
                    <div>
                        <Routes>
                            <Route path='/' element={<LoginPage />} />
                            <Route path='/Main' element={<MainPage />} />
                            <Route path='/Login' element={<LoginPage />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        </AppContext.Provider>
    )
}

export default App;