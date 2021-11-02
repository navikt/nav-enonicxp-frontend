import React, { useEffect } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import { BodyShort, Title } from '@navikt/ds-react';
import ErrorPage404 from '../../../pages/404';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { editorPathPrefix } from '../../../utils/urls';
import './GlobalValuesPage.less';

const bem = BEM('global-values-page');

const GlobalValuesDisplay = ({ displayName, data }: GlobalValuesProps) => {
    const { valueItems, valueUsage } = data;

    const value = valueItems?.numberValue;

    useEffect(() => {
        const header = document.getElementById('decorator-header');
        if (header) {
            header.style.display = 'none';
        }

        const footer = document.getElementById('decorator-footer');
        if (footer) {
            footer.style.display = 'none';
        }
    }, []);

    return (
        <div className={bem()}>
            <Title level={1} size={'l'} className={bem('header')}>
                {displayName}
            </Title>
            <BodyShort size={'m'}>
                {value !== undefined
                    ? `Verdi: ${value}`
                    : 'Ingen verdi definert'}
            </BodyShort>
            <div className={bem('usage')}>
                <Title level={2} size={'s'}>
                    {valueUsage.length > 0
                        ? 'Verdien er i bruk på disse sidene:'
                        : 'Verdien er ikke i bruk'}
                </Title>
                {valueUsage.map((usage) => (
                    <span>
                        <LenkeStandalone
                            href={usage.path.replace('/www.nav.no', '')}
                            target={'_blank'}
                            withChevron={false}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {usage.displayName}
                        </LenkeStandalone>
                        {' - '}
                        <LenkeStandalone
                            href={`${editorPathPrefix}/${usage.id}`}
                            target={'_blank'}
                            withChevron={false}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {'[Åpne i editor]'}
                        </LenkeStandalone>
                    </span>
                ))}
            </div>
        </div>
    );
};

// This is a page for editors only and should return 404 publically
export const GlobalValuesPage = (props: GlobalValuesProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    return <GlobalValuesDisplay {...props} />;
};
