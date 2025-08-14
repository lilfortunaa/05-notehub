import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={setPage}
            currentPage={page}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isLoading && <p>Loading...</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
