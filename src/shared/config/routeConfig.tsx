import { RouteProps } from 'react-router-dom';
import { CharsPage } from '../../pages/CharsPage';
import { CharPage } from '../../pages/CharPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export enum AppRoutes {
    MAIN = 'main',
    CHAR = 'char',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CHAR]: '/people/', // + :id
    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <CharsPage />,
    },
    [AppRoutes.CHAR]: {
        path: `${RoutePath.char}:id`,
        element: <CharPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
