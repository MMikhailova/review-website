import {
  Avatar,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
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
    await setForm(false)
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
      <Avatar>{user.firstName.slice(0,1)}</Avatar>
      <Typography
        required
        value={review.reviewer}
        onChange={handleChange}
      >{user.firstName} {user.lastName}</Typography>
      <Rating
        label="Rating"
        type="number"
        id="rating"
        name="rating"
        value={review.rating || 0}
        onChange={handleChange}
      ></Rating>
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
