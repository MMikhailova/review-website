// Mui component
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  Typography,
  useMediaQuery,

} from "@mui/material";
import background from "../../assets/background.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import GoogleIcon from "@mui/icons-material/Google";

// Hooks
import { useSignUp } from "../../hooks/useSignUp.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Api
import getBooks from "../../api/getBooks.js";
import { useTheme } from "@emotion/react";
import googleLogin from "../../api/authGoogle.js";


const PublicPage = () => {
const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { googleSignUp } = useSignUp();
   const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getBooks(setBooks, setError, setLoading);
  }, []);

  return (
  
    <Box
      sx={{
        overflowY: "hidden",
        backgroundImage: `url("${background}")`,
        backgroundSize: "cover", // Add backgroundSize property
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        rowSpacing={isMobile ? 0 : "8px"}
        sx={{
          height: "100svh",
          mt: 0,
          px: { xs: "4px", sm: "32px" },
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          height={"100%"}
          sx={{
            position: { xs: "absolute", sm: "unset" },
            zIndex: "1",
            backgroundColor: {
              xs: "rgba(255, 255, 255, 0.7)",
              sm: "unset",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Container
            maxWidth={"sm"}
            sx={{
              backgroundColor: { xs: "white", sm: "unset" },
              py: 2,
              mx:{xs:.5,sm:0},
              px: { xs: 3, md: 10 },
              gap: { xs: 2, md: 2 },
              alignItems: "normal",
              display: "flex",
              flexDirection: "column",
              borderRadius: " .5rem",
            }}
          >
            <Typography variant="h2">
              Immerse Yourself <br /> in the Bookverse
            </Typography>
            <Typography variant="poster">
              REVEAL <span style={{ color: "#E6BE7F" }}>*</span> READ{" "}
              <span style={{ color: "#E6BE7F" }}>*</span> REVIEW
            </Typography>
            <Button
              onClick={()=>googleLogin(googleSignUp)}
              variant="contained"
              sx={{
                fontSize: "0.8rem",
                backgroundColor: "#AB9A77",
                "&:hover": {
                  backgroundColor: "#82662e",
                },
                color: "black",
              }}
            >
              <GoogleIcon sx={{ mr: "5px" }} />
              Continue with Google
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              sx={{
                fontSize: "0.8rem",
                backgroundColor: "#3E2D2F",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              variant="contained"
            >
              Sign up with email
            </Button>

            <Typography variant="caption text" color={"gray"}>
              By creating an account, you agree to the Bookverse Terms of
              Service and Privacy Policy.
            </Typography>
            <Typography variant="poster">
              Already a member
              <Button
                sx={{ color: "#345456" }}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} position={"relative"} display={"flex"}>
          {loading && (
            <CircularProgress
              size={"3rem"}
              sx={{
                justifySelf: "center",
                m:"auto",
                color: "white",
              }}
            />
          )}
          {books.length > 0 && (
            <ImageList
              cols={isMobile ? 2 : 3}
              sx={{
                mx: "auto",
                width: { xs: "100%", sm: "80%" },
                height: "100svh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: 0,
                },
              }}
            >
              {books.map((book) => (
                <ImageListItem key={book.url}>
                  <img
                    srcSet={`${book.url}?fit=contain&auto=format&dpr=2 2x`}
                    src={`${book.url}`}
                    alt={book.title}
                    loading="lazy"
                    style={{
                      height: "auto",
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
        </Grid>
      </Grid>
      </Box>
  
  );
};

export default PublicPage;
