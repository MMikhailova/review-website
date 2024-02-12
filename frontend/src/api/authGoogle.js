

const googleLogin = async (googleSignUp) => {
 
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
export default googleLogin;
