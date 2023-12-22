import {Card} from '@mui/material';
import {Char} from '../../model/types/char.ts';
import {Loader} from '../../../../shared/ui/Loader/Loader.tsx';
import cls from './CharCard.module.css';

interface CharCardPropsType {
    className?: string;
    data?: Char;
    isLoading?: boolean;
    error?: string;
}

export const CharCard = (props: CharCardPropsType) => {
    const {
        className,
        data,
        isLoading,
        error,
    } = props;

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return null;
    }

    return (
        <Card>
            {data?.name}
        </Card>
    )
};
