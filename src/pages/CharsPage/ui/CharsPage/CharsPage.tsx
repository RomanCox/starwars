import {ChangeEvent, memo, useCallback, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Pagination, Stack, Typography} from '@mui/material';
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
    let [_, setSearchParams] = useSearchParams();
    const page = useSelector(getPage);
    const search = useSelector(getSearch);

    const fetchChars = useCallback(() => {
        dispatch(fetchCharsList());
    }, [dispatch])

    const fetchSearchingData = useDebounce(fetchChars, 500);

    const count = useMemo(() => {
        return numberOfChars ? Math.ceil(numberOfChars / 10) : undefined;
    }, [numberOfChars]);

    const onChangePage = useCallback((_event: ChangeEvent<unknown>, page: number) => {
        dispatch(charsActions.setPage({page}));
        fetchChars();
    }, [dispatch]);

    const onChangeSearch = useCallback((value: string) => {
        dispatch(charsActions.setSearch({value}));
        fetchSearchingData();
    }, [])

    useEffect(() => {
        fetchChars();
    }, [fetchChars])

    useEffect(() => {
        let params: Record<string, string | string[]> = {page: String(page)};
        if (search) {
            params.search = search;
        }
        setSearchParams(params);
    }, [page]);

    useEffect(() => {
        let params: Record<string, string | string[]> = {page: '1'};
        if (search !== '') {
            params = {page: '1', search: search};
        }
        setSearchParams(params);
        dispatch(charsActions.setPage({page: 1}));
    }, [search]);

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
                {isLoading
                    ? <Loader/>
                    : chars?.length === 0
                        ? <Typography variant="h3" component="h3" >{'Cant find this chars'}</Typography>
                        : chars?.map(char => (
                        <CharItem char={char} key={char.url}/>
                    ))
                }
            </Stack>
            <Stack spacing={2}>
                {!isLoading && chars?.length !== 0 && count && <Pagination
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
