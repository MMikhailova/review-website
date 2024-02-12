import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import getReviews from "../../api/getReviews";
import NavBar from "../NavBar/NavBar";

const Reviews = () => {
  const [reviews, setReviews] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
  const user = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      const data = user.id && (await getReviews(user.id, setError, setLoading));
      setReviews(data);
    }
    fetchData();
  }, [user.id]);
  return (
    <>
      <NavBar />
      <Grid
        sx={{
          marginTop: "15vh",
          backgroundColor: "#345457",
          justifyContent: "space-around",
        }}
        container
        minHeight={"100vh"}
        rowGap={{ xs: 3, md: 5 }}
        columnGap={2}
        py={3}
      >
        {loading ? (
          <Box>Loading...</Box>
        ) : (
          reviews?.map((review) => (
            <Grid
              item
              key={review.bookId}
              xs={10}
              md={6}
              sx={{
                borderRadius: "4px",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                flexWrap: "nowrap",
                backgroundColor: "white",
                maxHeight: "fit-content",
                width: "100%",
                textAlign: "center",
                p: { xs: "1.5rem", md: "1.5rem" },
              }}
            >
              <img
                style={{
                  width: "30%",
                  height: "auto",
                  objectFit: "fill",
                  alignSelf: "center",
                }}
                src={review.url}
              ></img>
              <Stack
                sx={{
                  width: { md: "100%" },
                  p: { md: "1.5rem" },
                  alignItems: "center",
                }}
                gap={1}
                direction={"column"}
              >
                <Typography variant="h3">{review.title}</Typography>
                <Typography variant="h4">{review.author}</Typography>
                <Rating
                  name="read-only"
                  value={review.rating ? review.rating : 0}
                  readOnly
                ></Rating>
                <Typography sx={{ textAlign: "justify" }} variant="body">
                  {review.text}
                </Typography>
              </Stack>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default Reviews;
