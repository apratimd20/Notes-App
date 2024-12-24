import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState={
    pastes:localStorage.getItem("pastes")
     ? JSON.parse(localStorage.getItem("pastes"))
     : []

}

export const PasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers:{
        addToPaste: (state,action) =>{
            const paste = action.payload;
            if (state.pastes === ' '){
                toast.error("notes can't be created in blanks")
            }
           else {
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes))
            toast.success('Notes Created Successfully')
           }
        },
        updateToPaste:(state,action) =>{
          const paste = action.payload
          const index = state.pastes.findIndex((item) => item.id === paste.id)
          state.pastes[index] = paste
          localStorage.setItem("pastes", JSON.stringify(state.pastes))

          toast.success("Notes Updated")
            
        },
        resetAllPaste:(state,action)=>{
            state.pastes = [];
            localStorage.removeItem("pastes")
            
        },
        removeFromPaste:(state,action)=>{
            const pasteId  = action.payload
            console.log(pasteId);
            const index = state.pastes.findIndex((item)=>item._id === pasteId);
            if(index >=0)
                state.pastes.splice(index,1);
            localStorage.setItem("pastes", JSON.stringify(state.pastes));
            toast.success("Notes Deleted");
        }
    }
})

export const {addToPaste,updateToPaste,resetAllPaste,removeFromPaste} = PasteSlice.actions

export default PasteSlice.reducer 