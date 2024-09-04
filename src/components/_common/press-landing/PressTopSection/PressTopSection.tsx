import { Heading } from '@navikt/ds-react';
import { PressLandingPageProps } from 'types/content-props/dynamic-page-props';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';

import styles from './PressTopSection.module.scss';

type PressTopSectionProps = {
    page: {
        displayName: PressLandingPageProps['displayName'];
        data: {
            pressCall?: PressLandingPageProps['data']['pressCall'];
            title?: PressLandingPageProps['data']['title'];
        };
    };
};

export const PressTopSection = (props: PressTopSectionProps) => {
    const { displayName, data } = props.page;
    const { pressCall, title } = data;

    return (
        <div className={styles.pressTopSection}>
            <div className={styles.content}>
                <Heading size={'xlarge'} level={'1'}>
                    {title || displayName}
                </Heading>
                {pressCall && (
                    <div className={styles.pressCall}>
                        <ParsedHtml htmlProps={pressCall} />
                    </div>
                )}
            </div>
        </div>
    );
};
