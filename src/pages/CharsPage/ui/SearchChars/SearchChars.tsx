import {ChangeEvent, memo, useCallback, useEffect} from 'react';
import {TextField} from '@mui/material';
import {classNames} from '../../../../shared/lib/classNames/classNames.ts';
import cls from './SearchChars.module.css';


interface SearchCharsPropsType {
    className?: string;
    value: string;
    onChange: (value: string) => void;
}

export const SearchChars = memo((props: SearchCharsPropsType) => {
    const {className, value, onChange} = props;


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.currentTarget.value)
    }, [])

    useEffect(() => {})

    return (
        <div className={classNames(cls.SearchChars, {}, [className])}>
            <TextField type="search" value={value} onChange={(e) => onChangeHandler(e)}/>
        </div>
    );
});

