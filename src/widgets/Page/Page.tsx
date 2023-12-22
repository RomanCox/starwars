import {memo, ReactNode} from 'react';
import { classNames } from '../../shared/lib/classNames/classNames.ts';
import cls from './Page.module.css';

interface PagePropsType {
    className?: string;
    children: ReactNode;
}

export const Page = memo((props: PagePropsType) => {
    const { className, children } = props;

    return (
        <main
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
        </main>
    );
});
