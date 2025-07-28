import React from 'react';
import { Kalkulator } from 'components/_common/kalkulator/Kalkulator';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';
import { usePageContentProps } from 'store/pageContext';
import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { CalculatorData } from 'components/parts/kalkulator/KalkulatorPart';
import style from './KalkulatorPage.module.scss';

export type KalkulatorProps = ContentCommonProps & {
    type: ContentType.ContactInformationPage;
    data: CalculatorData;
};

export const KalkulatorPage = (props: KalkulatorProps) => {
    const { editorView, noRedirect } = usePageContentProps();

    if (!editorView && !noRedirect) {
        return <RedirectTo404 />;
    }

    return (
        <section className={style.kalkulatorPage}>
            <Kalkulator calculatorData={props.data} />
        </section>
    );
};
