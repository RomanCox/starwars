import {memo} from 'react';
import {classNames} from '../../../../shared/lib/classNames/classNames.ts';
import {Link} from 'react-router-dom';
import {Avatar, Paper, Typography} from "@mui/material";
import {Char} from '../../../../entities/Char';
import {RoutePath} from '../../../../shared/config/routeConfig.tsx';
import cls from './CharItem.module.css';

interface CharItemPropsType {
    className?: string;
    char: Char;
}

export const CharItem = memo((props: CharItemPropsType) => {
    const {className, char} = props;
    const urlArr = char.url.split('/');
    const id = urlArr[urlArr.length - 2];

    return (
        <Link to={RoutePath.char + id}>
            <Paper elevation={3} className={classNames(cls.CharItem, {}, [className])}>
                <Avatar/>
                <Typography variant="h5" component="h4">{char.name}</Typography>
            </Paper>
        </Link>
    );
});

