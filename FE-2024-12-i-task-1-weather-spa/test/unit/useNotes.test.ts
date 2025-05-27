import { renderHook, act } from "@testing-library/react";
import { useNotes } from "../../src/hooks/useNotes";
import { Note } from "../../src/utils/shared-types";

describe("useNotes Hook", () => {
  const lat = "40.714";
  const lon = "-74.006";
  const storageKey = `notes_${lat}_${lon}`;

  beforeEach(() => {
    localStorage.clear();
  });

  test("initially loads notes from localStorage", () => {
    const savedNotes: Note[] = [
      { id: "1", text: "First note", date: "2025-03-17" },
    ];
    localStorage.setItem(storageKey, JSON.stringify(savedNotes));

    const { result } = renderHook(() => useNotes({ lat, lon }));

    expect(result.current.notes).toEqual(savedNotes);
  });

  test("adds a new note and saves it to localStorage", () => {
    const { result } = renderHook(() => useNotes({ lat, lon }));

    const newNote: Note = { id: "2", text: "New Note", date: "2025-03-17" };

    act(() => {
      result.current.addNewNote(newNote);
    });

    expect(result.current.notes).toContainEqual(newNote);
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toContainEqual(
      newNote
    );
  });

  test("does not add empty notes", () => {
    const { result } = renderHook(() => useNotes({ lat, lon }));

    act(() => {
      result.current.addNewNote({ id: "3", text: "", date: "2025-03-17" });
    });

    expect(result.current.notes).toEqual([]);
    expect(localStorage.getItem(storageKey)).toEqual("[]");
  });

  test("selects a note correctly", () => {
    const { result } = renderHook(() => useNotes({ lat, lon }));

    const note: Note = { id: "4", text: "Selected note", date: "2025-03-17" };

    act(() => {
      result.current.handleSelectNote(note);
    });

    expect(result.current.selectedNote).toEqual(note);
  });

  test("edits a selected note", () => {
    const { result } = renderHook(() => useNotes({ lat, lon }));

    const note: Note = {
      id: "5",
      text: "   Selected note",
      date: "2025-03-17",
    };

    act(() => {
      result.current.handleSelectNote(note);
    });

    act(() => {
      result.current.onEdit("Selected note updated");
    });

    expect(result.current.selectedNote?.text).toBe("Selected note updated");
  });

  test("saves an edited note and updates localStorage", () => {
    const initialNotes: Note[] = [
      { id: "6", text: "Old text", date: "2025-03-17" },
    ];
    localStorage.setItem(storageKey, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes({ lat, lon }));

    act(() => {
      result.current.saveEditedNote({
        id: "6",
        text: "Updated text",
        date: "2025-03-17",
      });
    });

    expect(result.current.notes).toContainEqual({
      id: "6",
      text: "Updated text",
      date: "2025-03-17",
    });

    expect(JSON.parse(localStorage.getItem(storageKey)!)).toContainEqual({
      id: "6",
      text: "Updated text",
      date: "2025-03-17",
    });
  });

  test("does not save an edited note if the text is empty", () => {
    const initialNotes: Note[] = [
      { id: "7", text: "Original note", date: "2025-03-17" },
    ];
    localStorage.setItem(storageKey, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes({ lat, lon }));

    act(() => {
      result.current.saveEditedNote({ id: "7", text: "", date: "2025-03-17" });
    });

    expect(result.current.notes).toEqual(initialNotes);
    expect(localStorage.getItem(storageKey)).toEqual(
      JSON.stringify(initialNotes)
    );
  });

  test("deletes a note and updates localStorage", () => {
    const initialNotes: Note[] = [
      { id: "8", text: "To be deleted", date: "2025-03-17" },
    ];
    localStorage.setItem(storageKey, JSON.stringify(initialNotes));

    const { result } = renderHook(() => useNotes({ lat, lon }));

    act(() => {
      result.current.handleDeleteNote("8");
    });

    expect(result.current.notes).toEqual([]);
    expect(localStorage.getItem(storageKey)).toEqual("[]");
  });
});
