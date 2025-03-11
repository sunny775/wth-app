export const getUserLocation = (
  cb: (lat: number, lon: number) => void,
  onError?: (message: string) => void
) => {
  if (!navigator.geolocation) {
    onError?.("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      cb(latitude, longitude);
    },
    (error) => {
      let errorMessage = "Unable to retrieve your location.";

      switch (error.code) {
        case 1: // Permission denied
          errorMessage =
            "Location access denied. Please enable location services in your browser settings.";
          break;
        case 2: // Position unavailable
          errorMessage = "Location information is unavailable.";
          break;
        case 3: // Timeout
          errorMessage = "Location request timed out. Try again.";
          break;
      }

      console.error(errorMessage, error);
      onError?.(errorMessage);
    }
  );
};
