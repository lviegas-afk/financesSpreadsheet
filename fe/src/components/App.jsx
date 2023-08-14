import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import MainUpload from './upload/MainUpload';
import Chart from './Chart';
import Exchange from './Exchange';
import { Cookies } from 'react-cookie';
import Login from './login/Login'

function App() {

  // set up cookies
  const cookies = new Cookies();  
  const token = cookies.get("user-token");

  
  if(token == undefined){
    return(
      <Login/>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/upload" element={<MainUpload />} />
        <Route exact path="/chart" element={<Chart />} />
        <Route exact path="/verduleria" element={<Exchange />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
