import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, Stack, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {deleteFromFavorites, addToFavorites} from "../../api/updateFavorites.js";
import { AuthContext } from "../../context/AuthContext";

// import { BookContext } from "../../context/BookContext";
const MAX_DESCRIPTION_LENGTH = 250; // Set your desired maximum length

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return { truncated: false, text };
  }
  return { truncated: true, text: text.slice(0, maxLength)+ "..." };
};

const countReviews = (array) => {
  return array.length
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft:"auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BookCard({ book, favorite }) {
  const [isfavorite, setFavorite] = useState(favorite)
  
  const [expanded, setExpanded] = useState(false);
  const { truncated, text } = truncateText(
    book.description,
    MAX_DESCRIPTION_LENGTH
  );
      const user = useContext(AuthContext);
  const handleFavorites = async() => {
    try {
      if (!isfavorite) {
        await addToFavorites(user.id, book._id);
        setFavorite(true)
      } else {
        await deleteFromFavorites(user.id, book._id);
        setFavorite(false);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };
const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: 600, height: 400, display: "flex" }}>
      <CardMedia
        sx={{ width: "40%" }}
        component="img"
        image={book.url}
        alt="Book Cover"
      />
      <Stack direction={"column"}>
        <CardContent
          sx={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            {book.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {book.author}
          </Typography>
          <Rating
            name="read-only"
            value={book.rating && book.rating}
            readOnly
          />
          <Link
            component="button"
            variant="body1"
            onClick={() => {
              //  setBookId(book._id);
              navigate(`/book/${book._id}`);
            }}
          >
            {`Reviews (${countReviews(book.reviews)})`}
          </Link>
          <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="text.secondary">
              {text}
            </Typography>
          </Collapse>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="text.secondary">
              {book.description}
            </Typography>
          </Collapse>
        </CardContent>

        <CardActions disableSpacing>
          <Tooltip title="Add to favorites" arrow>
            <IconButton aria-label="add to favorites" onClick={ handleFavorites }>
              {isfavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </IconButton>
          </Tooltip>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              // setBookId(book._id);
              navigate(`/book/${book._id}`);
            }}
          >
            Discover more
          </Link>
          {truncated && (
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          )}
        </CardActions>
      </Stack>
    </Card>
  );
}
