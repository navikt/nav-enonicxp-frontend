import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import style from './AreaCard.module.scss';

import { AccessibilityAnimation } from './open-pages/accessibility/AccessibilityAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialCounsellingAnimation } from './open-pages/social-counselling/SocialCounsellingAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

type Props = {
    href: string;
    title: string;
    area: string;
};

export const AreaCard = ({ href, title, area }: Props) => {
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
                {area === 'accessibility' ? <AccessibilityAnimation /> : ''}
                {area === 'family' ? <FamilyAnimation /> : ''}
                {area === 'health' ? <HealthAnimation /> : ''}
                {area === 'pension' ? <PensionAnimation /> : ''}
                {area === 'social_counselling' ? (
                    <SocialCounsellingAnimation />
                ) : (
                    ''
                )}
                {area === 'work' ? <WorkAnimation /> : ''}
            </div>
        </LinkPanel>
    );
};
