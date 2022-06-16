import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import style from './AreaCard.module.scss';

import { AssistiveAidsAnimation } from './open-pages/assistive-aids/AssistiveAidsAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialServicesAnimation } from './open-pages/social-services/SocialServicesAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

type Props = {
    href: string;
    title: string;
};

export const AreaCard = ({ href, title }: Props) => {
    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <LenkeBase
                    href={href}
                    analyticsLabel={title}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
        >
            <div
                className={
                    title.length > 17 ? style.titleLong : style.titleShort
                }
            >
                <LinkPanel.Title>{title}</LinkPanel.Title>
            </div>
            <div className={style.animationArea}>
                {title === 'Hjelpemidler og tilrettelegging' ? (
                    <AssistiveAidsAnimation />
                ) : (
                    ''
                )}
                {title === 'Familie og barn' ? <FamilyAnimation /> : ''}
                {title === 'Helse og sykdom' ? <HealthAnimation /> : ''}
                {title === 'Pensjon' ? <PensionAnimation /> : ''}
                {title === 'Arbeid' ? <WorkAnimation /> : ''}
                {title === 'Sosiale tjenester  og veiledning' ? (
                    <SocialServicesAnimation />
                ) : (
                    ''
                )}
            </div>
        </LinkPanel>
    );
};
