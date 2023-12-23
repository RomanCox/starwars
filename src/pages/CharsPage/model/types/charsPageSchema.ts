import {Char} from "../../../CharPage";

export interface CharsPageSchema {
    isLoading?: boolean;
    error?: string;
    count?: number;
    page?: number;
    data?: Char[];
    search?: string | null;
}
