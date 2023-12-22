import {Char} from '../../../../entities/Char';

export interface CharPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: Char;
}
