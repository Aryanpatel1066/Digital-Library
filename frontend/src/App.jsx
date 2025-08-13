import Navbar from "./components/Navbar";
import Router from "./components/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App(){
  return(
    <>
<Navbar/>
 <Router/>
         <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
 }
 export default App;