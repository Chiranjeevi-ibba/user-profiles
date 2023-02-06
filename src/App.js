import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import EachRestaurant from "./components/EachRestaurant"
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import PrivateRoutes from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import jsCookie from "js-cookie"
import "./App.css"


function App() {
  const { jwtToken } = useSelector((store) => store.jwtToken);
  console.log(jwtToken);
  console.log(jsCookie.get("jwt_token"));

  const handleNavbar = () => {
    if(jwtToken !== undefined) {
      return <Navbar />
    }
    return null
  }

  return (
      <Router className="app">
      {handleNavbar()}
      {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/restaurant/:id" element={<EachRestaurant />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/payment" element={<Payment />} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App;  