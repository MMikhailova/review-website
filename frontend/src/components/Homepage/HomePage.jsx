// Mui component
import { Box, CircularProgress, Container, Grid } from "@mui/material";
// Hooks
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
// Api
import getBooks from "../../api/getBooks.js";
import getUserInfo from "../../api/getUserInfo.js";
// Child components
import BookCard from "./BookCard.jsx";
import ErrorAlert from "../ErrorPage/ErrorPage.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";

// Checking for favored books in array of all books
const isBookFavorited = (array, id) => {
  if (array && id) {
    return array.some((obj) => obj.bookId === id);
  }
};
const HomePage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserInfo();
      setFavoriteBooks(data?.favorites);
      await getBooks(setBooks, setError, setLoading);
    }
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#345457",
        flexGrow: 1,
   
      }}
    >
      <NavBar />
      {error && <ErrorAlert />}
      <Grid
        sx={{
          marginTop: "15vh",
          p: { xs: 0.5, md: 8},
        }}
        container
        spacing={4}
      >
        {loading ? (
          <CircularProgress sx={{ color: "white" }} size={"3rem"} />
        ) : (
          books.map((book) => (
            <Grid
              item
              key={book.id}
              sm={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <BookCard
                key={book._id}
                book={book}
                favorite={isBookFavorited(favoriteBooks, book.id)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
