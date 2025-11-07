import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Visibility, Create, ContentCopy, Share, Delete, Search, Add } from "@mui/icons-material";
import apiConfig from "../config/apiConfig";
import axios from "axios";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        handleNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const filterData = notes
    .filter((note) =>
      note?.title?.toLowerCase().includes(search.toLowerCase()) ||
      note?.content?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

  function handleShare(pasteId) {
    if (navigator.share) {
      navigator.share({
        title: "Check out this note",
        url: `${window.location.origin}/notes/${pasteId}`
      }).catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/notes/${pasteId}`);
      toast.success("Link copied to clipboard");
    }
  }

  const token = localStorage.getItem("token");

  async function handleNotes(){
    try{
      setIsLoading(true);
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
      toast.error("Failed to load notes");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      {/* Delete Confirmation Popup */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Your Notes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Organize and manage all your notes in one place
          </p>
        </div>

        {/* Search and Create Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                type="search"
                placeholder="Search notes by title or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link
              to="/home"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <Add className="h-5 w-5 mr-2" />
              New Note
            </Link>
          </div>
        </div>

        {/* Notes Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filterData.length > 0 ? (
          <div className="grid gap-6">
            {filterData.map((note) => (
              <div
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
                key={note?._id}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900 truncate flex-1 mr-4">
                    {note?.title || "Untitled Note"}
                  </h2>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {note?.createdAt ? new Date(note.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : "No Date"}
                  </p>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {note?.content || "No content available"}
                </p>
                
                <div className="flex justify-end space-x-3">
                  <Link 
                    to={`/home?pasteId=${note?._id}`} 
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200 hover:scale-110"
                    title="Edit note"
                  >
                    <Create className="h-5 w-5" />
                  </Link>
                  
                  <Link 
                    to={`/notes/${note?._id}`} 
                    className="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-200 hover:scale-110"
                    title="View note"
                  >
                    <Visibility className="h-5 w-5" />
                  </Link>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content || "");
                      toast.success("Copied to clipboard");
                    }}
                    className="flex items-center justify-center w-10 h-10 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-all duration-200 hover:scale-110"
                    title="Copy content"
                  >
                    <ContentCopy className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={() => handleShare(note?._id)}
                    className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all duration-200 hover:scale-110"
                    title="Share note"
                  >
                    <Share className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={() => setDeleteConfirm(note?._id)}
                    className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-110"
                    title="Delete note"
                  >
                    <Delete className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
              <div className="text-gray-400 mb-4">
                <Create className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {search ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? `No notes matching "${search}" were found.`
                  : 'Create your first note to get started!'
                }
              </p>
              <Link
                to="/home"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <Add className="h-5 w-5 mr-2" />
                Create Your First Note
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;