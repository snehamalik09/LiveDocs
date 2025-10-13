import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Editor } from "@tiptap/react";

interface EditorState {
  editor: Editor | null;
  autosaving: boolean;
}

const initialState: EditorState = {
  editor: null,
  autosaving:false
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditor: (state, action: PayloadAction<any>) => {
      state.editor = action.payload;
    },
    setAutoSave: (state, action: PayloadAction<any>) => {
      state.autosaving =  action.payload;
    },
  },
});

export const { setEditor, setAutoSave } = editorSlice.actions;
export default editorSlice.reducer;
