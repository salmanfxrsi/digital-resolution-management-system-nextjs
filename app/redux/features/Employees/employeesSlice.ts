import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  showForm: false,
  selectedEmployee: null,
};

const employeesSlice = createSlice({
  name: "employees",
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
      state.selectedEmployee = null;
    },

    setSelectedEmployee(state, action) {
      state.selectedEmployee = action.payload;
      state.showForm = true;
    },

    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },
  },
});

export const {
  setSearch,
  openForm,
  closeForm,
  setSelectedEmployee,
  clearSelectedEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;
