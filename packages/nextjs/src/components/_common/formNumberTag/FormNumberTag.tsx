import { classNames } from 'utils/classnames';
import style from './FormNumberTag.module.scss';

interface Props {
    formNumber: string;
    className?: string;
}

export const FormNumberTag = ({ formNumber, className }: Props) => {
    return <div className={classNames(style.formNumberTag, className)}>{formNumber}</div>;
};

export default FormNumberTag;
