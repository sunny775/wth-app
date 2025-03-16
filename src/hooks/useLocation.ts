import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryKeys } from "../utils/weather";

export const getUserLocation = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("LOCATION",{latitude, longitude})
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
      }
    );
  });
};

export default function useLocation() {
  const queryClient = useQueryClient();

  const { userLoation: locationKey } = queryKeys;

  const { data, error, isLoading } = useQuery({
    queryKey: locationKey(),
    queryFn: getUserLocation,
    retry: false,
  });

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    const handlePermissionChange = async () => {
      await queryClient.invalidateQueries({ queryKey: locationKey() });

      const data = queryClient.getQueryData<{ lat: string; lon: string }>(
        locationKey()
      );

      if (permissionStatus?.state === "granted" && data) {
        window.location.href = `/${data.lat}/${data.lon}`;
      }
    };

    navigator.permissions.query({ name: "geolocation" }).then((status) => {
      permissionStatus = status;
      permissionStatus.onchange = handlePermissionChange;
    });

    return () => {
      if (permissionStatus) {
        permissionStatus.onchange = null;
      }
    };
  }, [queryClient, locationKey, data]);

  return {
    data,
    error,
    isLoading,
  };
}
