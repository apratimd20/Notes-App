import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setContent(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    const paste = {
      title: title.trim(),
      content: content.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }
    setTitle("");
    setContent("");
    setSearchParams({});
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button 
            onClick={createPaste} 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            {pasteId ? "Update Note" : "Create Note"}
          </button>
        </div>
        <textarea
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px]"
          value={content}
          placeholder="Enter content here"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Home;
