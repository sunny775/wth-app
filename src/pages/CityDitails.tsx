import { useSearchParams } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";
import { WeathewrData } from "../utils/types";

const fetchCity = async (query: string): Promise<WeathewrData> => {
  const url = `https://api.weatherstack.com/current?access_key={PASTE_YOUR_API_KEY_HERE}&query=${query}`;
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch search results");
  }
};

type Note = { id: string; content: string; date: Date };

const CityDetails = () => {
  const [searchParams] = useSearchParams();
  const [note, setNote] = useState("");

  const lat = searchParams.get("latitude");
  const lon = searchParams.get("longitude");
  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery<WeathewrData>({
    queryKey: [`${lat}_${lon}`, lat, lon],
    queryFn: () => fetchCity(`${lon},${lon}`),
    staleTime: 1000 * 60 * 60, // Cache results for 1 hour
  });

  const [persistedNotes, saveNote, deleteNote] = useLocalStorage<Note[]>(
    `${lat}_${lon}`,
    []
  );

  const handleSaveNote = (note: Note) => {
    saveNote((notes = []) => [...notes, note]);
  };

  const handleDeleteNote = (noteId: string) => {
    saveNote((notes = []) => notes.filter((n) => n.id !== noteId));
  };

  return (
    <div>
      {weatherData && (
        <>
          <h1>{weatherData.location.name}</h1>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
          <button
            onClick={() =>
              handleSaveNote({ content: note, id: uuidv4(), date: new Date() })
            }
          >
            Save Notes
          </button>
        </>
      )}
    </div>
  );
};

export default CityDetails;
