import Dashboard from "./Dashboard.jsx"
import Subject from "./pages/Subject.jsx";
import Task from "./pages/Task.jsx";
import Calendar from "./pages/Calendar.jsx";
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/subject' element={<Subject />}></Route>
        <Route path='/tasks' element={<Task />}></Route>
        <Route path='/calendar' element={<Calendar />}></Route>
      </Routes>
    </>
  )
}

export default App;
