import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import getUserInfo from '../../api/getUserInfo';
import getBooks from '../../api/getBooks';
import { Grid, Typography } from '@mui/material';
import BookCard from '../Homepage/BookCard';
const isBookFavorited = (array, id) => {
  if (array && id) {
    return array.some((obj) => obj.bookId === id);
  }
};
const Favorites = () => {
     const [fav, setFav] = useState(null);
     const [error, setError] = useState("");
     const [loading, setLoading] = useState("");
     const [books, setBooks] = useState([]);
     const user = useContext(AuthContext);

     useEffect(() => {
       async function fetchData() {
         const data = user.id && (await getUserInfo(user.id));
         setFav(data.favorites);
         await getBooks(setBooks, setError, setLoading);
       }
       fetchData();
     }, []);

  return (
    <Grid
      sx={{
        backgroundColor: "#345457",
        justifyContent: "space-around",
      }}
     minHeight={"100vh"}
      container
      rowSpacing={4}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
                  books.map((book) => (
            isBookFavorited(fav, book.id)&&
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
              favorite={true}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default Favorites
