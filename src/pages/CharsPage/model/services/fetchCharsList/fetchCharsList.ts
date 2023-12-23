import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '../../../../../app/providers/StoreProvider/config/StateSchema.ts';
import {charsActions} from '../../slices/charsPageSlice/charsPageSlice.ts';
import {getPage, getSearch} from "../../selectors/charsSelectors.ts";
import {Char} from "../../../../CharPage";

interface GetCharacters {
    count: number;
    next: string | null;
    previous: string | null;
    results: Char[];
}

interface ParamsType {
    page?: number;
    search?: string;
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

        console.log(page)

        let params: ParamsType = {
            page: page,
        }

        if (search !== '') {
            params = {
                page: page,
                search: search,
            }
        }

        try {
            const response = await extra.api.get<GetCharacters>('/people', {
                params,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(charsActions.setCount({count: response.data.count}));
            const nextPage = response.data.next ? response.data.next.split('').at(-1) : null;
            const prevPage = response.data.previous ? response.data.previous.split('').at(-1) : null;
            let value = nextPage ? +nextPage - 1 : prevPage ? +prevPage + 1 : 1;
            dispatch(charsActions.setPage({page: value}));

            return response.data.results;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
