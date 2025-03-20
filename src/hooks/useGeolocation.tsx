import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";

interface GeolocationOptions extends PositionOptions {
  immediate?: boolean;
}

interface GeolocationState {
  accuracy: number;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface UseGeolocationReturn {
  isSupported: boolean;
  coords: GeolocationState;
  locatedAt: number | null;
  error: GeolocationPositionError | null;
  resume: () => void;
  pause: () => void;
}

export function useGeolocation(options: GeolocationOptions = {}): UseGeolocationReturn {
  const {
    enableHighAccuracy = true,
    maximumAge = 30000,
    timeout = 27000,
    immediate = true,
  } = options;

  const isSupported = "geolocation" in navigator;
  const [locatedAt, setLocatedAt] = useState<number | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [coords, setCoords] = useState<GeolocationState>({
    accuracy: 0,
    latitude: null,
    longitude: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  });

  const watcher = useRef<number | null>(null);
  const navigate = useNavigate();
  const hasNavigated = useRef<boolean>(false);

  const updatePosition = useCallback((position: GeolocationPosition) => {
    setLocatedAt(position.timestamp);
    setCoords({
      accuracy: position.coords.accuracy,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
    });
    setError(null);

    if (!hasNavigated.current && position.coords.latitude && position.coords.longitude) {
      navigate(`/${position.coords.latitude}/${position.coords.longitude}`);
      hasNavigated.current = true;
    }
  }, [navigate]);

  const resume = useCallback(() => {
    if (isSupported) {
      watcher.current = navigator.geolocation.watchPosition(
        updatePosition,
        (err) => setError(err),
        {
          enableHighAccuracy,
          maximumAge,
          timeout,
        }
      );
    }
  }, [isSupported, updatePosition, enableHighAccuracy, maximumAge, timeout]);

  const pause = useCallback(() => {
    if (watcher.current !== null) {
      navigator.geolocation.clearWatch(watcher.current);
      watcher.current = null;
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      resume();
    }
    return () => {
      pause();
    };
  }, [immediate, resume, pause]);

  return {
    isSupported,
    coords,
    locatedAt,
    error,
    resume,
    pause,
  };
}
