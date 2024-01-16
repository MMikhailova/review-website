import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import getReviews from "../../api/getReviews";

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
    <Grid
      px={20}
      sx={{
        backgroundColor: "#345457",
        justifyContent: "space-around",
      }}
      container
      minHeight={"100vh"}
      rowGap={5}
    >
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        reviews.map((review) => (
          <Grid
            item
            key={review.bookId}
            xs={8}
            sx={{
              display: "flex",
              justifyContent: "stretch",
              flexWrap: "wrap",
              backgroundColor: "white",
              height: "300px",
            }}
          >
            <Box
              key={review.id}
              sx={{ display: "flex", width: "100%", height: "100%" }}
            >
              <img
                style={{ width: "30%", objectFit: "fill" }}
                src={review.url}
              ></img>
              <Stack sx={{ width: "70%", p: 3 }} gap={1} direction={"column"}>
                <Typography>{review.title}</Typography>
                <Typography>{review.author}</Typography>
                <Rating
                  name="read-only"
                  value={review.rating ? review.rating : 0}
                  readOnly
                ></Rating>
                <Typography>{review.text}</Typography>
              </Stack>
            </Box>
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Reviews;
