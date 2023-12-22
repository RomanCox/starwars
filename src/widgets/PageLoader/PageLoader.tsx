import {classNames} from '../../shared/lib/classNames/classNames.ts';
import {Loader} from "../../shared/ui/Loader/Loader.tsx";
import cls from './PageLoader.module.css';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Loader />
    </div>
);
