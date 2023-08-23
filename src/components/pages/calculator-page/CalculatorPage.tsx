import React from 'react';

import { Calculator } from 'components/_common/calculator/Calculator';
import { CalculatorProps } from 'types/content-props/calculator-props';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './CalculatorPage.module.scss';

export const CalculatorPage = (props: CalculatorProps) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (!editorView) {
        return <RedirectTo404 />;
    }

    return (
        <div className={style.calculatorPage}>
            <Calculator calculatorData={props.data} />
        </div>
    );
};