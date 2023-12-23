import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CharsPageSchema} from '../../types/charsPageSchema.ts';
import {fetchCharsList} from "../../services/fetchCharsList/fetchCharsList.ts";
import {Char} from "../../../../CharPage";

const initialState: CharsPageSchema = {
    isLoading: false,
    error: undefined,
    count: 0,
    page: 1,
    data: [] as Char[],
    search: undefined,
};

export const charsSlice = createSlice({
    name: 'charsSlice',
    initialState,
    reducers: {
        setData: (state, { payload }: PayloadAction<{ data: Char[] }>) => {
            state.data = payload.data;
        },
        setCount: (state, { payload }: PayloadAction<{ count: number }>) => {
            state.count = payload.count;
        },
        setPage: (state, { payload }: PayloadAction<{ page: number }>) => {
            state.page = payload.page;
        },
        setSearch: (state, { payload }: PayloadAction<{ value: string | null }>) => {
            state.search = payload.value;
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
            .addCase(fetchCharsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchCharsList.fulfilled, (
                state,
                action: PayloadAction<Char[]>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCharsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { actions: charsActions } = charsSlice;
export const { reducer: charsReducer } = charsSlice;
