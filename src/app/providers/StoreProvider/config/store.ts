import {configureStore} from '@reduxjs/toolkit';
import {StateSchema} from './StateSchema';
import {charsReducer} from '../../../../pages/CharsPage/model/slices/charsPageSlice/charsPageSlice.ts';
import {charReducer} from '../../../../pages/CharPage/model/slices/charPageSlice/charPageSlice.ts';
import {$api} from '../../../../api/api.ts';

export const createReduxStore = (initialState?: StateSchema) => {
    const extraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: {
            chars: charsReducer,
            char: charReducer,
        },
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg
            }
        })
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
