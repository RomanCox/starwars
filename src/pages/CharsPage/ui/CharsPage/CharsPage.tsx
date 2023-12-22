import {ChangeEvent, memo, useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Pagination, Stack} from '@mui/material';
import {useSearchParams} from 'react-router-dom';
import {useDebounce} from '../../../../shared/lib/hooks/useDebounce/useDebounce.ts';
import {useAppDispatch} from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {fetchCharsList} from '../../model/services/fetchCharsList/fetchCharsList.ts';
import {
    getChars,
    getCharsIsLoading,
    getNumberOfChars,
    getPage,
    getSearch
} from '../../model/selectors/charsSelectors.ts';
import {CharItem} from '../CharItem/CharItem.tsx';
import {Loader} from '../../../../shared/ui/Loader/Loader.tsx';
import {charsActions} from '../../model/slices/charsPageSlice/charsPageSlice.ts';
import {SearchChars} from '../SearchChars/SearchChars.tsx';
import cls from './CharsPage.module.css';

const CharsPage = memo(() => {
    const dispatch = useAppDispatch();
    const chars = useSelector(getChars);
    const numberOfChars = useSelector(getNumberOfChars);
    const isLoading = useSelector(getCharsIsLoading);
    let [searchParams, setSearchParams] = useSearchParams();
    const page = useSelector(getPage);
    const search = useSelector(getSearch);
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search');

    const fetchChars = useCallback(() => {
        dispatch(fetchCharsList());
    }, [dispatch])

    const fetchSearchingData = useDebounce(fetchChars, 500);

    const count = useMemo(() => {
        return Math.ceil(numberOfChars || 0 / 10)
    }, [numberOfChars]);

    const onChangePage = (_event: ChangeEvent<unknown>, page: number) => {
        let params: Record<string, string | string[]> = {};
        if (searchParams.has('search')) {
            params.search = searchParams.get('search') as string;
        }
        params.page = String(page);
        setSearchParams(params);
        dispatch(charsActions.setPage({page}));
        fetchChars();
    };

    const onChangeSearch = useCallback((value: string) => {
        let params: Record<string, string | string[]> = {page: '1'};
        params.search = value;
        if (value === '') {
            searchParams.delete('search')
        }
        setSearchParams(params);
        dispatch(charsActions.setSearch({value}));
        fetchSearchingData();
    }, [fetchSearchingData, setSearchParams])

    useEffect(() => {
        if (searchParams.has('page')) {
            if (typeof Number(pageParam) === 'number') {
                dispatch(charsActions.setPage({page: Number(pageParam)}));
            }
        }
        if (searchParams.has('search')) {
            dispatch(charsActions.setSearch({value: searchParam}));
        }

        fetchSearchingData();
    }, [dispatch, searchParam])

    useEffect(() => {
        let params: Record<string, string | string[]> = {};
        if (page) {
            params.page = String(page);
        }
        if (search) {
            params.search = search;
        }
        setSearchParams(params);
    }, [])

    return (
        <div className={cls.MainPage}>
            <SearchChars value={search} onChange={onChangeSearch}/>
            <Stack
                className={cls.charsList}
                spacing={{xs: 1, sm: 2}}
                direction="row"
                flexWrap="wrap"
                useFlexGap
                justifyContent="center"
            >
                {isLoading || chars?.length === 0
                    ? <Loader/>
                    : chars?.map(char => (
                        <CharItem char={char} key={char.url}/>
                    ))
                }
            </Stack>
            <Stack spacing={2}>
                {!isLoading && chars?.length !== 0 && count > 1 && <Pagination
                    count={count}
                    color="primary"
                    onChange={onChangePage}
                    page={page}
                />}
            </Stack>
        </div>
    );
});

export default CharsPage;
