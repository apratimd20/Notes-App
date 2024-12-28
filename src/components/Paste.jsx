import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Visibility, Create, ContentCopy, Share, Delete } from "@mui/icons-material";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };

  const filterData = pastes
    .filter((paste) =>
      paste?.title?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 

  function handleShare(pasteId) {
    navigator.share({
      title: "See this note",
      url: `${window.location.origin}/pastes/${pasteId}`
    }).catch(error => console.log('Error sharing', error));
  }

  return (
    <div className="container mx-auto mt-8 px-4">
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
            filterData.map((paste) => (
              <div
                className="bg-white shadow-md rounded-lg p-5 transition-all duration-300 hover:shadow-lg"
                key={paste?._id}
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold truncate flex-grow">{paste?.title?.toUpperCase() || "Untitled"}</h2>
                  <p className="text-sm text-gray-500">
                    {paste?.createdAt ? new Date(paste.createdAt).toLocaleDateString() : "No Date"}
                  </p>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{paste?.content || "No content available"}</p>
                <div className="flex justify-end space-x-2">
                  <Link to={`/?pasteId=${paste?._id}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Create />
                  </Link>
                  <Link to={`/pastes/${paste?._id}`} className="text-green-600 hover:text-green-800 transition-colors">
                    <Visibility />
                  </Link>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(paste?.content || "");
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
                    onClick={() => handleDelete(paste?._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Delete />
                  </button>
                  <button 
                    onClick={() => handleShare(paste?._id)}
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
