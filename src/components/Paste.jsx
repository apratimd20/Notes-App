import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import Visiblity from '@mui/icons-material/Visibil'


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };

  const filterData = pastes.filter((paste) =>
    paste?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[44%] h-[80%]  rounded flex flex-col ml-[25%] mt-4">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-3"
        type="search"
        placeholder="Search for a notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5 rounded-2xl ">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              className="border flex flex-row justify-between rounded-3xl h-28 p-5 mb-5  bg-slate-200"
              key={paste?._id}>
              <div className="w-[70%]">
                <h2 className="text-2xl font-bold">{paste?.title?.toUpperCase() || "Untitled"}</h2>
                <div className="max-w-40 truncate overflow-hidden">
                  {paste?.content || "No content available"}
                </div>
              </div>
              <div className="flex flex-row gap-4 place-content-evenly w-[30%] ">
                <div className="flex flex-col">
                  <div>
                    {paste?.createdAt
                      ? new Date(paste.createdAt).toLocaleDateString()
                      : "No Date"}
                  </div>
                  <div className="flex justify-around text-sm">
                    <button>
                      <Link to={`/?pasteId=${paste?._id}`}>
                     {/* <Visiblity/> */}
                      </Link>
                    </button>
                    <button>
                      <Link to={`/pastes/${paste?._id}`}>
                      
                        view
                      
                      </Link>
                    </button>
                    <button
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(paste?.content || "");
                          toast.success("Copied to clipboard");
                        } else {
                          toast.error("Clipboard not supported");
                        }
                      }}>
                      Copy
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button>Share</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">
            No pastes found matching "{search}".
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
