import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './ui/pages/LoginPage';
import DaySchedulePage from './ui/pages/SchedulePage';
import MainPage from './ui/pages/MainPage';

export const AppContext = React.createContext()

function App () {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [sid, setSId] = useState("");
    const [data, setData] = useState("{}");
    const [scheduleMainCategoryList, setScheduleMainCategoryList] = useState([]);
    const [scheduleSubCategoryList, setScheduleSubCategoryList] = useState([]);
    const [scheduleTaskList, setScheduleTaskList] = useState([]);
    const [toDoMainCategoryList, setToDoMainCategoryList] = useState([]);
    const [toDoSubCategoryList, setToDoSubCategoryList] = useState([]);
    const [toDoTaskList, setToDoTaskList] = useState([]);
    const [moneyMainCategoryList, setMoneyMainCategoryList] = useState([]);
    const [moneySubCategoryList, setMoneySubCategoryList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);

    const store = {
        id, password, setId, setPassword, sid, setSId, data, setData,

        scheduleMainCategoryList, setScheduleMainCategoryList,
        scheduleSubCategoryList, setScheduleSubCategoryList,
        scheduleTaskList, setScheduleTaskList,

        toDoMainCategoryList, setToDoMainCategoryList,
        toDoSubCategoryList, setToDoSubCategoryList,
        toDoTaskList, setToDoTaskList,

        moneyMainCategoryList, setMoneyMainCategoryList,
        moneySubCategoryList, setMoneySubCategoryList,
        moneyTaskList, setMoneyTaskList,
    }

    return (
        <AppContext.Provider value={store}>
            <div className="App">
                <Router>
                    <div className="defaultReactDiv">
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