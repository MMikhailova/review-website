
// React components
import HomePage from '../src/components/Homepage/HomePage.jsx'
import PublicPage from "./components/PublicPage/PublicPage.jsx";
import LoginPage from './components/Authentication/LoginPage.jsx'
import NavBar from "../src/components/NavBar/NavBar.jsx";
import SignUp from "./components/Authentication/SignUpPage.jsx";
import BookPage from "./components/BookPage/BookPage.jsx";
import Reviews from "./components/Personal/Reviews.jsx";
import Favorites from "./components/Personal/Favorites.jsx";
//React Hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContext } from "../../frontend/src/context/AuthContext.jsx";
import { useContext} from "react";
// Styles
import './GlobalStyles.css'
import { createTheme, ThemeProvider } from "@mui/material/styles";




const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "'Dancing Script', cursive",
      color: "#E6BE7F",
      fontSize: "80px",
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
      color: "white",
    },
    h2: {
      fontFamily: "'Dancing Script', cursive",
      color: "black",
    },
  },
});

function App() {
  const user = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          {user.id ? (
            <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<PublicPage />} />
          )}
          <Route
            path="/user/reviews"
            element={user.id ? <Reviews /> : <LoginPage />}
          />
          <Route
            path="/user/favorites"
            element={user.id ? <Favorites /> : <LoginPage />}
          />

          <Route
            path="/book/:bookId"
            element={user.id? <BookPage /> : <LoginPage />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
