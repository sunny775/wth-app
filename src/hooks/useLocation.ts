import { useEffect, useState } from "react";

export const getUserLocation = async (
  state: PermissionState
): Promise<{
  lat: number;
  lon: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    if (!navigator.onLine) {
      if (state === "granted" && localStorage.userLocation) {
        return resolve(JSON.parse(localStorage.userLocation));
      }
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case 1:
            errorMessage = "Location access denied.";
            break;
          case 2:
            errorMessage = "Location information is unavailable.";
            break;
          case 3:
            errorMessage = "Location request timed out.";
            break;
        }

        reject(new Error(errorMessage));
      },
      { enableHighAccuracy: true, maximumAge: 1000 * 60 * 60 * 2 }
    );
  });
};

export default function useLocation() {
  const [data, setData] = useState<{ lat: number; lon: number } | null>();
  const [error, setError] = useState<Error | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isNewState, setIsNewState] = useState<boolean>(true);

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      (async (status: PermissionStatus) => {
        permissionStatus = status;
        console.log(status);
        const handlePermission = async () => {
          try {
            setLoading(true);
            if (status.state !== "prompt") {
              setIsNewState(localStorage.locationState !== status.state);
              localStorage.locationState = status.state;
            }

            const location = await getUserLocation(status.state);
            console.log(location);

            setData(location);
            setError(null);
            localStorage.userLocation = JSON.stringify(location);
          } catch (err) {
            if (err instanceof Error) {
              setError(err);
              console.log(err);
            } else {
              setError(new Error("Uknown location Error"));
            }
          } finally {
            setLoading(false);
          }
        };
        await handlePermission();
        permissionStatus.onchange = handlePermission;
      })(status);
    });

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, []);

  return {
    loading,
    data,
    error,
    isNewState,
  };
}
