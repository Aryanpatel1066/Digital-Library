import { Routes,Route } from "react-router";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Search from "../pages/Search";
import SearchBar from "../components/SearchBar";
import BookDetails from "../pages/BookDetails";
function Router(){
    return(
        <>
        <Routes>
          <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
        <Route path="/search" element={<Search />} />
                <Route path="/books/:id" element={<BookDetails />} />

        </Routes>
        
        </>
    )
}
export default Router;