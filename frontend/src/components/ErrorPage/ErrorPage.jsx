import { Alert, Box,Button,Typography } from '@mui/material'
import { useLogout } from '../../hooks/useLogOut.js';


const ErrorAlert = () => {
     const { logout } = useLogout();
  return (
    <Box
      sx={{
        width: "100vw",
        height: "90vh",
        backgroundColor: "#345457",
        display: "flex",
        justifyContent: "center",
              alignItems: "center",
      }}
    >
      <Alert
        variant="outlined"
        severity="error"
        sx={{
          width: "50%",
          height: "fit-content",
            p: 2,
            rowGap:2,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">
        Ooops...Something went wrong...
          <br /> No worries life is still wonderful!
        </Typography>
        <Button onClick={()=>logout()}>Return to the home page</Button>
      </Alert>
    </Box>
  );
}

export default ErrorAlert; 
