import React from 'react';
import { LinkPanel } from '@navikt/ds-react';
import { IndexPageLink } from 'components/layouts/index-page/navigation/link/IndexPageLink';
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
import { AreaCardType } from '../../../types/component-props/parts/area-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

const areaTypeComponentMap: { [key in AreaCardType]: React.FunctionComponent } =
    {
        cases: CasesAnimation,
        'employment-status-form': EmploymentStatusFormAnimation,
        payments: PaymentsAnimation,
        accessibility: AccessibilityAnimation,
        family: FamilyAnimation,
        health: HealthAnimation,
        pension: PensionAnimation,
        social_counselling: SocialCounsellingAnimation,
        work: WorkAnimation,
    };

const DefaultComponent = () => <div>{'Ugyldig grafikkvalg'}</div>;

type Props = {
    path: string;
    title: string;
    area: string;
};

export const AreaCard = ({ path, title, area }: Props) => {
    if (!area) {
        return <EditorHelp text={'Velg en grafikk for kortet'} />;
    }

    const GraphicComponent = areaTypeComponentMap[area] || DefaultComponent;

    return (
        <LinkPanel
            border={false}
            className={style.linkPanel}
            as={(props) => (
                <IndexPageLink
                    href={path}
                    analyticsLabel={title}
                    component="area-card"
                    {...props}
                >
                    {props.children}
                </IndexPageLink>
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
                <GraphicComponent />
            </div>
        </LinkPanel>
    );
};
