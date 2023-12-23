import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '../../../../../app/providers/StoreProvider/config/StateSchema.ts';
import {Char} from "../../types/charPageSchema.ts";

export const fetchChar = createAsyncThunk<
    Char,
    string,
    ThunkConfig<string>
>(
    'charPage/fetchChar',
    async (id, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Char>(`/people/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
