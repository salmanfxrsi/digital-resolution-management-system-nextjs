import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  showForm: false,
  selectedClient: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },

    openForm(state) {
      state.showForm = true;
    },

    closeForm(state) {
      state.showForm = false;
      state.selectedClient = null;
    },

    setSelectedClient(state, action) {
      state.selectedClient = action.payload;
      state.showForm = true;
    },

    clearSelectedClient(state) {
      state.selectedClient = null;
    },
  },
});

export const {
  setSearch,
  openForm,
  closeForm,
  setSelectedClient,
  clearSelectedClient,
} = clientsSlice.actions;

export default clientsSlice.reducer;
