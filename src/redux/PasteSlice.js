import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const getInitialState = () => {
  const storedPastes = localStorage.getItem("pastes");
  return {
    pastes: storedPastes ? JSON.parse(storedPastes) : [],
  };
};

const initialState = getInitialState();

const updateLocalStorage = (pastes) => {
  localStorage.setItem("pastes", JSON.stringify(pastes));
};

export const PasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      if (!paste.title.trim() || !paste.content.trim()) {
        toast.error("Notes can't be created with empty title or content", { position: 'top-right' });
      } else {
        state.pastes.push(paste);
        updateLocalStorage(state.pastes);
        toast.success('Note created successfully', { position: 'top-right' });
      }
    },
    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === updatedPaste._id);
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        updateLocalStorage(state.pastes);
        toast.success("Note updated successfully", { position: 'top-right' });
      } else {
        toast.error("Note not found", { position: 'top-right' });
      }
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All notes have been deleted", { position: 'top-right' });
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index !== -1) {
        state.pastes.splice(index, 1);
        updateLocalStorage(state.pastes);
        toast.success("Note deleted successfully", { position: 'top-right' });
      } else {
        toast.error("Note not found", { position: 'top-right' });
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = PasteSlice.actions;

export default PasteSlice.reducer;

