import React from 'react';
import { AreaCardGraphicsType } from '../../../../types/component-props/parts/area-card';
import { CasesAnimation } from './logged-in/cases/CasesAnimation';
import { EmploymentStatusFormAnimation } from './logged-in/employment-status-form/EmploymentStatusFormAnimation';
import { PaymentsAnimation } from './logged-in/payments/PaymentsAnimation';
import { AccessibilityAnimation } from './open-pages/accessibility/AccessibilityAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialCounsellingAnimation } from './open-pages/social-counselling/SocialCounsellingAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';
import { classNames } from '../../../../utils/classnames';

import style from './AreaCardGraphics.module.scss';

const areaTypeComponentMap: {
    [key in AreaCardGraphicsType]: React.FunctionComponent<{
        expanded: boolean;
    }>;
} = {
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
    type: string;
    insideCard: boolean;
};

export const AreaCardGraphics = ({ type, insideCard }: Props) => {
    const GraphicComponent = areaTypeComponentMap[type] || DefaultComponent;

    return (
        <div
            className={classNames(
                style.graphics,
                insideCard ? style.insideCard : ''
            )}
        >
            <GraphicComponent />
        </div>
    );
};
