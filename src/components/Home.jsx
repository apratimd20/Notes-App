import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";

function Home() {
  const [title, settitle] = useState();
  const [value, setvalue] = useState();
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      settitle(paste.title);
      setvalue(paste.content);
    }
  }, [pasteId]);
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toDateString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }
    settitle("");
    setvalue("");
    setsearchParams({});
  }
  return (
    <div className="w-[44%] h-[80%]  rounded flex flex-col ml-[25%] mt-4">
      <div className="flex flex-row gpa-7 place-content-between">
        <input
          className="p-1 rounded-2xl  mt-2 w-[65%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={title}
          required
          onChange={(e) => settitle(e.target.value)}
        />
        <button onClick={createPaste} className="p-2 rounded-2xl  mt-2 bg-slate-900 text-white">
          {pasteId ? "update My Notes" : "Create My Notes"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl min-w-[600px] p-4 mt-4 overflow-scroll bg-slate-200"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
}

export default Home;
