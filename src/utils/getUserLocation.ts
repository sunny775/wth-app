export const getUserLocation = (cb: (lat: number, lon: number) => void) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        cb(lat, lon);
      },
      (error) => console.error("Unable to retrieve your location:", error)
    );
  } else {
    console.log("Geolocation not supported");
  }
};
