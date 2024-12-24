import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";


function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  return (
    <div className="w-[44%] h-[80%]  rounded flex flex-col ml-[25%] mt-4">
      <div className="flex flex-row gpa-7 place-content-between">
        <input
          className="p-1 rounded-2xl  mt-2 w-[65%] pl-5"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => settitle(e.target.value)}
        />
        <button className="p-2 rounded-2xl  mt-2 bg-slate-900 text-white">
          <Link to={'/pastes'} >Back</Link>
        </button>
        
      </div>
      <div className="mt-8 ">
       <div className="min-w-[600px]  bg-slate-300 -z-10 rounded-2xl ">
        <div className="text-end pr-4" >
          <button onClick={() => {
                                        if (navigator.clipboard) {
                                            navigator.clipboard.writeText(paste?.content || '');
                                            toast.success('Copied to clipboard');
                                        } else {
                                            toast.error('Clipboard not supported');
                                        }
                                    }} >Copy</button></div>
       <textarea
          className="rounded-2xl min-w-[600px] p-4 mt-4 z-10 "
          value={paste.content}
          placeholder="Enter content here"
          disabled
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
       </div>
      </div>
    </div>
  );
}

export default ViewPaste;
