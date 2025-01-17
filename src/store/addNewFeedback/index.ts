import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import saveToFeedback from 'features/saveToFeedback';

export const addNewFeedbackThunk = createAsyncThunk(
    'ADD_NEW_FEEDBACK',
    async (formData, { rejectWithValue }) => {
        try {
            // @ts-ignore
            const res = await saveToFeedback(formData);

            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

interface IAddNewFeedbackSlice {
    loading: boolean;
    error: any;
    res: any;
}

const initialState: IAddNewFeedbackSlice = {
    loading: false,
    error: null,
    res: {},
};

const addNewFeedbackSlice = createSlice({
    name: 'addNewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addNewFeedbackThunk.pending, (state) => {
            state.loading = true;
            state.error = initialState.error;
            state.res = initialState.res;
        });

        builder.addCase(addNewFeedbackThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.res = payload;
        });
        builder.addCase(addNewFeedbackThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.res = initialState.res;
        });
    },
});

export default addNewFeedbackSlice.reducer;
