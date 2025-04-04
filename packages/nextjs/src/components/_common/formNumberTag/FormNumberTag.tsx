import style from './FormNumberTag.module.scss';

interface Props {
    formNumber: string;
}

export const FormNumberTag = ({ formNumber }: Props) => {
    return <div className={style.formNumberTag}>{formNumber}</div>;
};

export default FormNumberTag;
