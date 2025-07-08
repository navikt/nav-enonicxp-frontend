import { classNames } from 'utils/classnames';
import style from './FormNumberTag.module.scss';

interface Props {
    formNumber: string;
    className?: string;
}

export const FormNumberTag = ({ formNumber, className }: Props) => {
    return <span className={classNames(style.formNumberTag, className)}>{formNumber}</span>;
};

export default FormNumberTag;
