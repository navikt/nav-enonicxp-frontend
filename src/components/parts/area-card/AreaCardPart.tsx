import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { AreaCardPartProps } from '../../../types/component-props/parts/area-card';
import { getSelectableLinkProps } from '../../../utils/links-from-content';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import style from './AreaCardPart.module.scss';

import { AssistiveAidsAnimation } from './open-pages/assistive-aids/AssistiveAidsAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialServicesAnimation } from './open-pages/social-services/SocialServicesAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

export const AreaCardPart = ({ config }: AreaCardPartProps) => {
    if (!config) {
        return null;
    }

    const { link } = config;
    const linkProps = getSelectableLinkProps(link);

    console.log(linkProps.text, linkProps.text.length); //TODO fjern

    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <LenkeBase
                    href={linkProps.url}
                    analyticsLabel={linkProps.text}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <div className={linkProps.text.length > 17 ? style.titleLong : style.titleShort}>
                <LinkPanel.Title>{linkProps.text}</LinkPanel.Title>
            </div>
            <div className={style.animationArea}>
            {linkProps.text === 'Hjelpemidler og tilrettelegging' ? (
                    <AssistiveAidsAnimation />
                ) : (
                    '')}
            {linkProps.text === 'Familie og barn' ? (
                    <FamilyAnimation />
                ) : (
                    ''
                )}
                {linkProps.text === 'Helse og sykdom' ? (
                    <HealthAnimation />
                ) : (
                    ''
                )}
                 {linkProps.text === 'Pensjon' ? (
                    <PensionAnimation />
                ) : (
                    ''
                )}
                {linkProps.text === 'Arbeid' ? (
                    <WorkAnimation />
                ) : (
                    ''
                )}
                                {linkProps.text === 'Sosiale tjenester  og veiledning' ? (
                    <SocialServicesAnimation />
                ) : (
                    ''
                )}
            </div>
        </LinkPanel>
    );
};
