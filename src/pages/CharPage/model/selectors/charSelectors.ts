import {StateSchema} from '../../../../app/providers/StoreProvider';

export const getChar = (state: StateSchema) => state.char.data;
export const getCharIsLoading = (state: StateSchema) => state.char.isLoading || false;
export const getCharError = (state: StateSchema) => state.char.error;
