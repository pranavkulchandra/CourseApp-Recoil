
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { RecoilRoot } from "recoil";
import AppBar from "./Components/AppBar";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Courses from "./Components/Courses";
import AddCourse from "./Components/AddCourse";
import Init from "./Components/Init";

function App(){ 

  return (

    <RecoilRoot>
      <div style={{ backgroundColor: "#ffffff", width:"100vw", height: "100vh"}}>
        <Router >
          <AppBar />
          <Init />
            <Routes>
              <Route path="/addcourse" element={<AddCourse />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
        </div>
        </RecoilRoot>
        
     
  )
}

export default App;