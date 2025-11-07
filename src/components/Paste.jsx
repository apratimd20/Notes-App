import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Visibility, Create, ContentCopy, Share, Delete } from "@mui/icons-material";
import apiConfig from "../config/apiConfig";
import axios from "axios";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Track which note to delete

  const handleDelete = async (pasteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiConfig.notes}/${pasteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        toast.success("Note deleted successfully");
        // Refresh the notes list after deletion
        handleNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleteConfirm(null); // Close confirmation popup
    }
  };

  const filterData = notes
    .filter((note) =>
      note?.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

  function handleShare(pasteId) {
    navigator.share({
      title: "See this note",
      url: `${window.location.origin}/notes/${pasteId}`
    }).catch(error => console.log('Error sharing', error));
  }

  const token = localStorage.getItem("token");

  async function handleNotes(){
    try{
      const response = await axios.get(apiConfig.notes,{
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if(response.status === 200){
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);  
    }
  }

  useEffect(() => {
    handleNotes();
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* Delete Confirmation Popup */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <input
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 shadow-sm"
          type="search"
          placeholder="Search for notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-4">
          {filterData.length > 0 ? (
            filterData.map((notes) => (
              <div
                className="bg-white shadow-md rounded-lg p-5 transition-all duration-300 hover:shadow-lg"
                key={notes?._id}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold truncate flex-grow">{notes?.title?.toUpperCase() || "Untitled"}</h2>
                  <p className="text-sm text-gray-500">
                    {notes?.createdAt ? new Date(notes.createdAt).toLocaleDateString() : "No Date"}
                  </p>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{notes?.content || "No content available"}</p>
                <div className="flex justify-end space-x-2">
                  <Link to={`/?notesId=${notes?._id}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Create />
                  </Link>
                  <Link to={`/notes/${notes?._id}`} className="text-green-600 hover:text-green-800 transition-colors">
                    <Visibility />
                  </Link>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(notes?.content || "");
                        toast.success("Copied to clipboard");
                      } else {
                        toast.error("Clipboard not supported");
                      }
                    }}
                    className="text-yellow-600 hover:text-yellow-800 transition-colors"
                  >
                    <ContentCopy />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm(notes?._id)} // Open confirmation popup
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Delete />
                  </button>
                  <button 
                    onClick={() => handleShare(notes?._id)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <Share />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-5 text-gray-600">No notes found matching "{search}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;