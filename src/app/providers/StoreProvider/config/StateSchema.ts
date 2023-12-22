import {AxiosInstance} from 'axios';
import {CharsPageSchema} from '../../../../pages/CharsPage/model/types/charsPageSchema.ts';
import {CharPageSchema} from '../../../../pages/CharPage';

export interface StateSchema {
    chars: CharsPageSchema;
    char: CharPageSchema;
}

interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
