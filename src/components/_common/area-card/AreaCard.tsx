import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { IndexPageNavigationLink } from 'components/layouts/index-page/navigation/link/IndexPageNavigationLink';
import style from './AreaCard.module.scss';

import { CasesAnimation } from './logged-in/cases/CasesAnimation';
import { EmploymentStatusFormAnimation } from './logged-in/employment-status-form/EmploymentStatusFormAnimation';
import { PaymentsAnimation } from './logged-in/payments/PaymentsAnimation';

import { AccessibilityAnimation } from './open-pages/accessibility/AccessibilityAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialCounsellingAnimation } from './open-pages/social-counselling/SocialCounsellingAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

type Props = {
    path: string;
    title: string;
    area?: string;
};

export const AreaCard = ({ path, title, area }: Props) => {
    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <IndexPageNavigationLink
                    href={path}
                    analyticsLabel={title}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </IndexPageNavigationLink>
            )}
        >
            <div
                className={
                    title.length > 17 ? style.titleLong : style.titleShort //TODO Finne en bedre løsning? Width settes også i px
                }
            >
                <LinkPanel.Title>{title}</LinkPanel.Title>
            </div>
            <div className={style.animationArea}>
                {title === 'Dine saker' ? <CasesAnimation /> : ''}
                {title === 'Dine meldekort' ? (
                    <EmploymentStatusFormAnimation />
                ) : (
                    ''
                )}
                {title === 'Dine utbetalinger' ? <PaymentsAnimation /> : ''}

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
