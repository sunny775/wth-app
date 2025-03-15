import { Edit, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useNotes } from "../../../hooks/useNotes";
import { Note } from "../../../utils/shared-types";
import Button from "../../Button";
import Textarea from "../../Textarea";

export default function Notes({ lat, lon }: { lat: string; lon: string }) {
  const {
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
  } = useNotes({ lat, lon });

  const sortByDateDesc = (notes: Note[]) =>
    notes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div>
      <div>
        <label htmlFor="CityNotes" className="sr-only">
          City notes
        </label>

        <div className="overflow-hidden">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            id="CityNotes"
            placeholder="Enter informative notes about this city..."
          />

          <div className="flex items-center justify-end gap-2 py-3">
            <Button
              onClick={() => setNewNote("")}
              type="button"
              className="h-8 text-gray-500"
            >
              Clear
            </Button>

            <Button
              onClick={() =>
                addNewNote({
                  text: newNote,
                  id: uuidv4(),
                  date: new Date().toISOString(),
                })
              }
              type="button"
              className="h-8"
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {sortByDateDesc(notes).map((note) => (
          <li
            key={note.id}
            className="border border-gray-50 dark:border-white/10 p-2 rounded-md shadow"
          >
            {selectedNote?.id === note.id ? (
              <div>
                <label htmlFor={note.id} className="sr-only">
                  Edit note
                </label>
                <Textarea
                  value={selectedNote.text}
                  onChange={(e) => onEdit(e.target.value)}
                  autoFocus
                  id={note.id}
                  placeholder="Enter any additional order notes..."
                />

                <div className="flex items-center justify-end gap-2 p-3">
                  <Button
                    onClick={() => setSelectedNote(null)}
                    className="h-8 text-gray-500"
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={() => saveEditedNote(selectedNote)}
                    className="h-8"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full p-4">
                <p>{note.text}</p>
                <p className="pt-4 text-gray-400 text-xs">
                  {new Date(note.date).toDateString()}
                </p>

                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => handleSelectNote(note)}
                    className="rounded-full w-9 px-0"
                  >
                    <Edit className="w-4 h-4">Edit</Edit>
                  </Button>

                  <Button
                    onClick={() => handleDeleteNote(note.id)}
                    className="rounded-full w-9 px-0"
                  >
                    <Trash className="w-4 h-4 stroke-red-500">Delete</Trash>
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
