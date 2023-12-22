import {Char} from '../../../../entities/Char';

export interface CharsPageSchema {
    isLoading?: boolean;
    error?: string;
    count?: number;
    page?: number;
    data?: Char[];
    search?: string | null;
}
