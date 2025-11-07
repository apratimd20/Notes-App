import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowBack, ContentCopy } from "@mui/icons-material";
import axios from "axios";
import apiConfig from "../config/apiConfig";

function ViewPaste() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log("Fetched note:", response.data);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      toast.error("Failed to fetch note");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleView();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!note) {
    return <div className="text-center mt-8">Note not found</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <Link to="/notes" className="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowBack className="mr-1" /> Back
          </Link>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 relative">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(note?.content || "");
                toast.success("Copied to clipboard", { position: "top-right" });
              } else {
                toast.error("Clipboard not supported", { position: "top-right" });
              }
            }}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <ContentCopy/>
          </button>
          <pre className="whitespace-pre-wrap">{note.content}</pre>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ViewPaste;