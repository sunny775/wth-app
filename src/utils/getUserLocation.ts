export const getUserLocation = () => navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const data = await res.json();
      window.location.href = `/city/${data.city}`;
    },
    (error) => console.error("Geolocation error:", error)
  );
  