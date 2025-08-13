import { Routes,Route } from "react-router";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile";
function Router(){
    return(
        <>
        <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
        </Routes>
        
        </>
    )
}
export default Router;