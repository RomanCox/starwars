import {StateSchema} from '../../../../app/providers/StoreProvider';

export const getChars = (state: StateSchema) => state.chars.data;
export const getPage = (state: StateSchema) => state.chars.page;
export const getNumberOfChars = (state: StateSchema) => state.chars.count;
export const getCharsIsLoading = (state: StateSchema) => state.chars.isLoading || false;
export const getCharsError = (state: StateSchema) => state.chars.error;
export const getSearch = (state: StateSchema) => state.chars.search || '';
