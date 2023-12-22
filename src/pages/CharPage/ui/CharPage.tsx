import {memo, useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Avatar, Button, Card, Skeleton, Stack, Typography} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import {RoutePath} from '../../../shared/config/routeConfig.tsx';
import {fetchChar} from '../model/services/fetchChar/fetchChar.ts';
import {getChar, getCharIsLoading} from '../model/selectors/charSelectors.ts';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import cls from './CharPage.module.css';


const CharPage = memo(() => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const char = useSelector(getChar);
    const isLoading = useSelector(getCharIsLoading);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.main);
    }, [navigate]);

    useEffect(() => {
        if (id) {
            dispatch(fetchChar(id))
        }
    }, [dispatch])

    return (
        <div className={cls.CharPage}>
            <Button
                className={cls.btn} onClick={onBackToList}
                variant="outlined"
                startIcon={<ArrowBackIosRoundedIcon />}
            >
                back
            </Button>
            <Card elevation={3} className={cls.charCard}>
                <Stack direction="row" spacing={3}>
                    {isLoading
                        ? <Skeleton variant="circular" width={60} height={60}/>
                        : <Avatar sx={{width: 60, height: 60}}/>
                    }
                    <Stack direction="column" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Typography variant="h4" component="h4">name:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={42}/>
                                : <Typography variant="h4" component="span">{char?.name}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">gender:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.gender}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">birth year:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.birth_year}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">height:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.height}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">mass:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.mass}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">skin color:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.skin_color}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">hair color:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.hair_color}</Typography>
                            }
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1" component="span">eye color:</Typography>
                            {isLoading
                                ? <Skeleton variant="rounded" width={150} height={28}/>
                                : <Typography variant="subtitle1" component="span">{char?.eye_color}</Typography>
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </div>
    );
});

export default CharPage;
