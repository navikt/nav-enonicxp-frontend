import { classNames } from 'utils/classnames';
import style from './FormNumberTag.module.scss';

interface Props {
    formNumber: string;
    className?: string;
    selected?: boolean;
}

export const FormNumberTag = ({ formNumber, className, selected }: Props) => {
    return (
        <div className={classNames(style.formNumberTag, selected && style.selectedTag, className)}>
            {formNumber}
        </div>
    );
};
