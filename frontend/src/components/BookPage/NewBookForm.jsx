import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import addReview from "../../api/addReview";

const NewBookForm = ({ bookId,setForm }) => {
   const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
    const user = useContext(AuthContext);
 
  const [review, setReview] = useState({
    reviewer: user.id,
    text: "",
    rating: 0,
  });
  const handleChange = (e) => {
       const value =
           e.target.name === "rating" ? Number(e.target.value) : e.target.value;
       
    setReview({
      ...review,
      [e.target.name]: value,
    });
    };
    
  const handleNewReview = async (event) => {
  event.preventDefault();
    await addReview(bookId, review, setError, setLoading);
   setForm(false)
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleNewReview}
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        gap: 1,
        p: 2,
      }}
    >
      <Avatar>{user.firstName.slice(0, 1)}</Avatar>
      <Typography required value={review.reviewer} onChange={handleChange}>
        {user.firstName} {user.lastName}
      </Typography>
      <FormControlLabel
        control={
          <>
            <input
              name="rating"
              type="number"
              value={review.rating}
              hidden
              readOnly
            />
            <Rating
              name="rating"
              value={review.rating}
              precision={1}
              onChange={(e, value) => {
                setReview({
                  ...review,
                   [e.target.name]: value,
                });
              }}
              icon={<StarIcon fontSize="inherit" />}
            />
          </>
        }
      />

      <TextField
        required
        fullWidth
        id="text"
        label="Review text"
        name="text"
        autoComplete="Add your review here..."
        value={review.text}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ width: "fit-content", alignSelf: "end" }}
      >
        Submit a review
      </Button>
    </Box>
  );
};

export default NewBookForm;
