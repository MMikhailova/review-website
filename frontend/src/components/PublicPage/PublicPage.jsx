// Mui component
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import GoogleIcon from "@mui/icons-material/Google";

// Hooks
import { useSignUp } from "../../hooks/useSignUp.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Api
import getBooks from "../../api/getBooks.js";

const PublicPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { googleSignUp } = useSignUp();

  useEffect(() => {
    getBooks(setBooks, setError, setLoading);
  }, []);

  const googleLogin = async () => {
    try {
      // Open the Google authentication page in a new window/tab
      const authWindow = window.open(
        `${import.meta.env.VITE_PROD_BASE_URL}/auth/google`,
        "_blank"
      );

      // Focus on the new window/tab
      if (authWindow) {
        authWindow.focus();
      }

      // Attach an event listener to check for changes in the window/tab URL
      window.addEventListener("message", (event) => {
        // Check if the event is from the opened authentication window
        if (event.source === authWindow) {
          // Parse the data received from the authentication window
          const authData = event.data;

          // Handle the received data, e.g., update local state
          if (authData.id && authData.isGoogleAuth) {
            googleSignUp(authData);
          }
        }
      });
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "#345457",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        maxHeight: "fit-content",
      }}
      maxWidth="xl"
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          mx: { xs: 0, md: 6 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">Immerse Yourself in the Bookverse</Typography>
        <Typography variant="h5">
          REVEAL <span style={{ color: "#E6BE7F" }}>*</span> READ{" "}
          <span style={{ color: "#E6BE7F" }}>*</span> REVIEW
        </Typography>
        <Container component="main" maxWidth="xs" sx={{ m: { xs: 3, md: 8 } }}>
          <Box
            sx={{
              py: { xs: 3, md: 4 },
              px: { xs: 3, md: 4 },
              gap: { xs: 2, md: 2 },
              alignItems: "stretch",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: " .5rem",
            }}
          >
            <Typography variant="h6">Discover & Read more</Typography>
            <Button
              onClick={googleLogin}
              variant="contained"
              sx={{ fontSize: "0.8rem" }}
            >
              <GoogleIcon sx={{ mr: "5px" }} />
              Continue with Google
            </Button>

            <Button
              onClick={() => navigate("/signup")}
              sx={{ fontSize: "0.8rem" }}
              variant="contained"
            >
              Sign up with email
            </Button>
            <Typography variant="caption text" color={"gray"}>
              By creating an account, you agree to the Bookverse Terms of
              Service and Privacy Policy.
            </Typography>
            <Typography>
              Already a member
              <Button onClick={() => navigate("/login")}>Sign in</Button>
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {loading && <CircularProgress sx={{ color: "white" }} size={"3rem"} />}
        {books.length > 0 && (
          <ImageList
            cols={3}
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: 0, 
              },
            }}
          >
            {books.map((book) => (
              <ImageListItem key={book.url} m={2}>
                <img
                  srcSet={`${book.url}?fit=contain&auto=format&dpr=2 2x`}
                  src={`${book.url}`}
                  alt={book.title}
                  loading="lazy"
                  style={{
                    height: "100%",
                    objectFit: "fill",
                    position: "relative",
                  }}
                />

                <Rating
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  name="read-only"
                  value={book.rating}
                  readOnly
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  );
};

export default PublicPage;
