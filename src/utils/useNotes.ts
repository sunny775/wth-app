import { useEffect, useState } from "react";
import { Note } from "./types";

export const useNotes = ({ lat, lon }: { lat: string; lon: string }) => {
  const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem(`notes_${lat}_${lon}`) || "[]"));
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    localStorage.setItem(`notes_${lat}_${lon}`, JSON.stringify(notes));
  }, [notes, lat, lon]);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const onEdit = (text: string) => {
    setSelectedNote((prev) => ({ ...prev!, text }));
  };

  const saveEditedNote = (editedNote: Note) => {
    if (editedNote.text.trim() === "") return;
    setNotes((prevNotes = []) =>
      prevNotes.map((note) =>
        note.id === editedNote.id ? { ...note, text: editedNote.text } : note
      )
    );
    setSelectedNote(null);
  };

  const addNewNote = (newNote: Note) => {
    if (newNote.text.trim() === "") return;
    setNotes((notes) => [...(notes || []), newNote]);
    setNewNote("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes((notes = []) => notes.filter((n) => n.id !== id));
  };

  return {
    notes,
    selectedNote,
    setSelectedNote,
    newNote,
    setNewNote,
    handleSelectNote,
    onEdit,
    saveEditedNote,
    addNewNote,
    handleDeleteNote,
  };
};
