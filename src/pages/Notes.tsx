import { Edit, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useNotes } from "../utils/useNotes";


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

  return (
    <div>
      <div>
        <label htmlFor="CityNotes" className="sr-only">
          City notes
        </label>

        <div className="overflow-hidden">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            id="CityNotes"
            className="block w-full rounded-md bg-gray-100 dark:bg-black/8 px-3 py-1.5  focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm/6"
            rows={4}
            placeholder="Enter informative notes about this city..."
          ></textarea>

          <div className="flex items-center justify-end gap-2 py-3">
            <button
              onClick={() => setNewNote("")}
              type="button"
              className="rounded-full border border-black/2 dark:border-white/20 px-3 py-1.5 text-sm font-medium text-sky-600 shadow hover:shadow-md"
            >
              Clear
            </button>

            <button
              onClick={() =>
                addNewNote({
                  text: newNote,
                  id: uuidv4(),
                  date: new Date().toISOString(),
                })
              }
              type="button"
              className="rounded-full bg-sky-700/20  px-3 py-1.5 text-sm font-medium text-sky-600 shadow hover:shadow-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-2">
        {notes?.map((note) => (
          <li
            key={note.id}
            className="border border-gray-50 dark:border-white/10 p-2 rounded-md shadow"
          >
            {selectedNote?.id === note.id ? (
              <div>
                <label htmlFor={note.id} className="sr-only">
                  Edit note
                </label>
                <textarea
                  value={selectedNote.text}
                  onChange={(e) => onEdit(e.target.value)}
                  autoFocus
                  id={note.id}
                  className="block w-full rounded-md bg-gray-100 dark:bg-black/10 px-3 py-1.5  focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 sm:text-sm/6"
                  rows={4}
                  placeholder="Enter any additional order notes..."
                ></textarea>

                <div className="flex items-center justify-end gap-2 p-3">
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="rounded-full border border-black/2 dark:border-white/20 px-3 py-1.5 text-sm font-medium text-gray-500 shadow hover:shadow-md"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => saveEditedNote(selectedNote)}
                    className="rounded-full bg-sky-700/20  px-3 py-1.5 text-sm font-medium text-sky-600 shadow hover:shadow-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full p-4">
                <p>{note.text}</p>
                <p className="pt-4 text-gray-400 text-xs">
                  {new Date(note.date).toDateString()}
                </p>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleSelectNote(note)}
                    className="rounded-full border border-black/2 dark:border-white/20 px-3 py-1.5 text-sm font-medium text-sky-600 shadow hover:shadow-md"
                  >
                    <Edit className="w-4 h-4">Edit</Edit>
                  </button>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="rounded-full border border-black/2 dark:border-white/20 px-3 py-1.5 text-sm font-medium text-red-400 shadow hover:shadow-md"
                  >
                    <Trash className="w-4 h-4">Delete</Trash>
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
