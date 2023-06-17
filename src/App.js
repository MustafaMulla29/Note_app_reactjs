import './App.css';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react'
import { MdDarkMode } from 'react-icons/md'


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  document.body.style.transition = " 0.5s"
  document.body.style.paddingRight = "0px"
  const [mode, setMode] = useState("light");

  const toggleMode = () => {

    const div = document.querySelectorAll("div.card")
    const modal = document.getElementById("Modal")
    const input = document.getElementsByTagName("input")
    const textarea = document.getElementsByTagName("textarea")

    if (mode === "light") {
      setMode("dark");
      document.body.style.color = "white"
      document.body.style.backgroundColor = "#343a40";
      for (let i = 0; i < div.length; i++) {
        div[i].style.background = "none"

      }

      modal.style.backgroundColor = "#343a40"
      modal.style.color = "white"

      for (let i = 0; i < input.length; i++) {
        input[i].style.background = "none"
        input[i].style.color = "white"
      }
      for (let i = 0; i < textarea.length; i++) {
        textarea[i].style.background = "none"
        textarea[i].style.color = "white"

      }
      for (let i = 0; i < modal.length; i++) {
        modal[i].style.background = "dark"
        modal[i].style.color = "white"

      }

      showAlert('Dark mode has been enabled', 'success')
    } else {
      setMode("light");
      document.body.style.color = "black"
      document.body.style.backgroundColor = "white";

      for (let i = 0; i < div.length; i++) {
        div[i].style.background = "white"
        // div[i].style.color = "black"
      }
      for (let i = 0; i < input.length; i++) {
        input[i].style.background = "white"
        input[i].style.color = "black"
      }

      for (let i = 0; i < textarea.length; i++) {
        textarea[i].style.background = "white"
        textarea[i].style.color = "black"

      }

      for (let i = 0; i < modal.length; i++) {
        modal[i].style.backgroundColor = "white"

      }

      modal.style.backgroundColor = "white"
      modal.style.color = "black"

      showAlert('Light mode has been enabled', 'success')

    }
  };

  return (
    <>

      <NoteState>
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert Alert={alert} />
          <div className="nav-item fontFamily" style={{ "display": "flex", "justifyContent": "flex-end", "alignItems": "center", "marginTop": "20px" }}>
            <MdDarkMode style={{ "width": "4%", "height": "4%", "cursor": "pointer" }} onClick={toggleMode} />
          </div>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} mode={mode} > </Route>
              <Route exact path="/about" element={<About mode={mode} />}> </Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} mode={mode} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} mode={mode} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App;
