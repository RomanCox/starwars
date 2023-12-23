import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Char, CharPageSchema} from '../../types/charPageSchema.ts';
import {fetchChar} from '../../services/fetchChar/fetchChar.ts';

const initialState: CharPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const charSlice = createSlice({
    name: 'charSlice',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<{ data: Char }>) => {
            state.data = payload.data;
        },
        setError: (state, { payload }: PayloadAction<{ error: string }>) => {
            state.error = payload.error;
        },
        setLoading: (state, { payload }: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = payload.isLoading;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChar.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchChar.fulfilled, (
                state,
                action: PayloadAction<Char>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchChar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: charActions } = charSlice;
export const { reducer: charReducer } = charSlice;
