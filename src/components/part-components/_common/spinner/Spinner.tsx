import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './Spinner.less';

type Props = {
    text?: string;
    className?: string;
};

export const Spinner = ({ text, className }: Props) => (
    <div className={`spinner-container${className ? ` ${className}` : ''}`}>
        {text && <Undertittel>{text}</Undertittel>}
        <NavFrontendSpinner className={'navno-spinner'} />
    </div>
);

export default Spinner;
