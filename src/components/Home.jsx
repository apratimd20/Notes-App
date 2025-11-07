import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";
import apiConfig from "../config/apiConfig";
import toast from "react-hot-toast";
import axios from "axios";
import { Save, Edit3, FileText, ArrowRight } from "lucide-react";

function Home() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const token = localStorage.getItem("token");

  // Fetch note data when editing
  useEffect(() => {
    if (pasteId) {
      const fetchNote = async () => {
        try {
          const response = await axios.get(`${apiConfig.notes}/${pasteId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if (response.status === 200) {
            setTitle(response.data.note.title);
            setContent(response.data.note.content);
          }
        } catch (error) {
          console.error("Error fetching note:", error);
          toast.error("Failed to load note");
        }
      };
      fetchNote();
    }
  }, [pasteId, token]);

  async function createPaste() {
    if (!title.trim() || !content.trim()) {
      toast.error("Please enter both title and content");
      return;
    }

    setIsLoading(true);

    const note = {
      title: title.trim(),
      content: content.trim(),
    };

    try {
      let response;
      
      if (pasteId) {
        // Update existing note
        response = await axios.put(`${apiConfig.notes}/${pasteId}`, note, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // Create new note
        response = await axios.post(apiConfig.notes, note, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(pasteId ? "Note updated successfully!" : "Note created successfully!");
        
        // Clear form and reset
        setTitle("");
        setContent("");
        setSearchParams({});
        
        // Update Redux store if needed
        if (pasteId) {
          dispatch(updateToPaste(response.data.note));
        } else {
          dispatch(addToPaste(response.data.note));
        }
      }
    } catch (error) {
      console.error("Error creating/updating note:", error);
      toast.error(error.response?.data?.message || "Failed to save note");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section - Compact */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20"></div>
              <FileText className="h-10 w-10 text-blue-600 relative z-10" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {pasteId ? 'Edit Note' : 'Create New Note'}
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            {pasteId 
              ? 'Update your note content'
              : 'Capture your thoughts and ideas'
            }
          </p>
        </div>

        {/* Note Form - Compact Design */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 sm:p-6">
            {/* Title Input */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Note Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 text-base"
                maxLength={100}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {title.length}/100
              </div>
            </div>

            {/* Content Textarea - Responsive Height */}
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Note Content
              </label>
              <textarea
                id="content"
                placeholder="Start typing your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none min-h-[200px] max-h-[50vh] text-base leading-relaxed"
              />
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-xs text-gray-500 order-2 sm:order-1">
                {content.length > 0 && (
                  <span>{content.split(/\s+/).filter(word => word.length > 0).length} words</span>
                )}
              </div>
              
              <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setSearchParams({});
                  }}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition-all duration-200 disabled:opacity-50"
                >
                  Clear
                </button>
                
                <button 
                  onClick={createPaste}
                  disabled={isLoading || !title.trim() || !content.trim()}
                  className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 shadow-md"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                      {pasteId ? 'Saving...' : 'Creating...'}
                    </div>
                  ) : (
                    <>
                      {pasteId ? <Edit3 className="h-3 w-3 mr-1" /> : <Save className="h-3 w-3 mr-1" />}
                      {pasteId ? 'Update' : 'Create'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tips Section - Compact */}
          <div className="mt-4 bg-blue-50/50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Quick Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use clear, descriptive titles</li>
              <li>• Break content into paragraphs</li>
              <li>• Add important info at the top</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;