import "./styles/App.css";
import Navbar from "./components/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/profile";
import Login from "./pages/login";
import UpdateMovies from "./pages/updateMovies";
import AllMovies from "./pages/allMovies";
import NewAccount from "./pages/newAccount";
import Payment from "./pages/updatePayment";
import MovieInfo from "./pages/movieInfo";
import MovieScreen from "./pages/movieScreen";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/login" element={<Login />} />
					<Route path="/updateMovies" element={<UpdateMovies />} />
					<Route path="/movies" element={<AllMovies />} />
					<Route path="/signup" element={<NewAccount />} />
					<Route path="/updatePayment" element={<Payment />} />
					<Route path="/movieInfo" element={<MovieInfo />} />
					<Route path="/movieScreen" element={<MovieScreen />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
