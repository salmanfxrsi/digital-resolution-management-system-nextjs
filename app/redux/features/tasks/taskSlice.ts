import { createSlice } from "@reduxjs/toolkit";

interface TaskState {
    search: string;
    showForm: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedTask: any,
}

const initialState: TaskState = {
    search: "",
    showForm: false,
    selectedTask: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        openForm: (state) => {
            state.showForm = true;
        },
        closeForm: (state) => {
            state.showForm = false;
        },
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload;
        },
        clearSelectedTask: (state) => {
            state.selectedTask = null;
        },

    },
});

export const {
    setSearch,
    openForm,
    closeForm,
    setSelectedTask,
    clearSelectedTask
} = taskSlice.actions;

export default taskSlice.reducer;
