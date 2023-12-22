import {createAsyncThunk} from '@reduxjs/toolkit';
import {Char} from '../../../../../entities/Char';
import {ThunkConfig} from '../../../../../app/providers/StoreProvider/config/StateSchema.ts';
import {charsActions} from '../../slices/charsPageSlice/charsPageSlice.ts';
import {getPage, getSearch} from "../../selectors/charsSelectors.ts";

interface GetCharacters {
    count: number;
    next: string | null;
    previous: string | null;
    results: Char[];
}

export const fetchCharsList = createAsyncThunk<
    Char[],
    void,
    ThunkConfig<string>
>(
    'charsPage/fetchCharsList',
    async (_, thunkAPI) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkAPI;
        const page = getPage(getState());
        const search = getSearch(getState());

        // const url = search ? `/people?search=${search}` : `/people?page=${page}`;

        try {
            const response = await extra.api.get<GetCharacters>('/people', {
                params: {
                    page: page,
                    search: search,
                }
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(charsActions.setCount({count: response.data.count}));
            const nextPage = response.data.next ? response.data.next.split('').at(-1) : null;
            const prevPage = response.data.previous ? response.data.previous.split('').at(-1) : null;
            let value = nextPage ? +nextPage - 1 : prevPage ? +prevPage + 1 : 0;
            dispatch(charsActions.setPage({page: value}));

            return response.data.results;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
