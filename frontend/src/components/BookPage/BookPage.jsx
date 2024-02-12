import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import getBook from "../../api/getBook.js";
import NewBookForm from "./NewBookForm.jsx";
import NavBar from "../NavBar/NavBar.jsx";
// import Review from './Review.jsx';

const BookPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [isForm, setForm] = useState(false);
  const [book, setBook] = useState([]);
  // Get a specific part of the URL, e.g., pathname
  const id = window.location.pathname.split("/").pop();
  useEffect(() => {
    getBook(id, setBook, setError, setLoading);
  }, [id, isForm]);

  return (
    <>
      <NavBar />
      {error && <div>{error}</div>}
      <Container
        maxWidth={"xl"}
        sx={{
          marginTop: "15vh",
          backgroundColor: "#345457",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 3,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#E9E1B9",
            width: { xs: "100vw", md: "60vw" },
            borderRadius: "4px",
          }}
        >
          <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid
              item
              xs={8}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
               alignSelf:"center",
                margin: { xs: "auto", md: 0 },
              }}
            >
              <img src={book.url} />
              <Button
                sx={{
                  backgroundColor: "lightgray",
                  ":hover": "#FAAF00",
                  color: "black",
                }}
                variant="contained"
                onClick={() => {
                  setForm(true);
                }}
              >
                + LEAVE REVIEW
              </Button>
            </Grid>
            <Grid item xs={12} md={8} sx={{ textAlign: "center" }}>
              <Typography variant="h2">{book.title}</Typography>
              <Typography variant="h4">{book.author}</Typography>
              <Rating
                name="read-only"
                value={book.rating ? book.rating : 0}
                readOnly
              ></Rating>
              <Typography sx={{ textAlign: "justify" }} variant="subtitle1">
                {book.description}
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {isForm && <NewBookForm bookId={id} setForm={setForm} />}
              {book.reviews &&
                book.reviews.length > 0 &&
                book.reviews
                  .slice()
                  .reverse()
                  .map((review) => (
                    <Box
                      key={review._id}
                      sx={{
                        display: "flex",
                        backgroundColor: "white",
                        flexDirection: "column",
                        borderRadius: "4px",
                        p: 1,
                      }}
                    >
                      <Stack direction={"row"}>
                        <Avatar>
                          {review.reviewer
                            ? review.reviewer.lastName.slice(0, 1)
                            : "U"}
                        </Avatar>
                        <Typography variant="subtitle1">
                          {review.reviewer ? review.reviewer.firstName : "User"}{" "}
                          {review.reviewer && review.reviewer.lastName}
                        </Typography>
                      </Stack>
                      <Rating
                        name="read-only"
                        value={review.rating && review.rating}
                        readOnly
                      />
                      <Typography>{review.text && review.text}</Typography>
                    </Box>
                  ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BookPage;
