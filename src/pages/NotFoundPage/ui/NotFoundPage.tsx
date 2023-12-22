import { Page } from '../../../widgets/Page/Page.tsx';
import { classNames } from '../../../shared/lib/classNames/classNames.ts';

import cls from './NotFoundPage.module.css';

export interface NotFoundPagePropsType {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPagePropsType) => {
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            Page not found
        </Page>
    );
};

export default NotFoundPage;
