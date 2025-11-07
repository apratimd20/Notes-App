import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Copy, Calendar, FileText, Edit3 } from "lucide-react";
import axios from "axios";
import apiConfig from "../config/apiConfig";

function ViewPaste() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCopying, setIsCopying] = useState(false);

  // Get token for authentication
  const token = localStorage.getItem("token");

  async function handleView() {
    try {
      const response = await axios.get(`${apiConfig.notes}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        setNote(response.data.note);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      toast.error("Failed to fetch note");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = async () => {
    if (!note?.content) return;
    
    setIsCopying(true);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(note.content);
        toast.success("Copied to clipboard!");
      } else {
        toast.error("Clipboard not supported");
      }
    } catch (error) {
      toast.error("Failed to copy");
    } finally {
      setIsCopying(false);
    }
  };

  useEffect(() => {
    handleView();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Note Not Found</h2>
          <p className="text-gray-600 mb-6">The note you're looking for doesn't exist or you don't have access to it.</p>
          <Link
            to="/notes"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/notes"
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg font-medium hover:bg-white/50 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notes
          </Link>
          
          <div className="flex items-center space-x-3">
            <Link
              to={`/home?pasteId=${note._id}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 text-sm"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Link>
            
            <button
              onClick={handleCopy}
              disabled={isCopying}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:text-gray-900 transition-all duration-200 disabled:opacity-50 text-sm"
            >
              {isCopying ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-2"></div>
                  Copying...
                </div>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Note Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Note Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-white" />
                <h1 className="text-2xl font-bold text-white truncate">
                  {note.title || "Untitled Note"}
                </h1>
              </div>
              <div className="flex items-center space-x-2 text-blue-100 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(note.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Note Content */}
          <div className="p-6">
            <div className="relative">
              <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-200/50">
                <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-base">
                  {note.content || "No content available"}
                </pre>
              </div>
              
              {/* Quick Copy Button */}
              <button
                onClick={handleCopy}
                disabled={isCopying}
                className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 shadow-sm"
                title="Copy content"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            {/* Note Metadata */}
            <div className="mt-6 pt-4 border-t border-gray-200/50">
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
                </div>
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <div className="flex items-center space-x-1">
                    <Edit3 className="h-4 w-4" />
                    <span>Updated: {new Date(note.updatedAt).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span>Words: {note.content.split(/\s+/).filter(word => word.length > 0).length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Characters: {note.content.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPaste;