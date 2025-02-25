import React from 'react';
import { classNames } from 'utils/classnames';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AreaCardGraphicsType } from 'components/parts/area-card/AreaCardPart';
import { CasesAnimation } from './logged-in/cases/CasesAnimation';
import { EmploymentStatusFormAnimation } from './logged-in/employment-status-form/EmploymentStatusFormAnimation';
import { PaymentsAnimation } from './logged-in/payments/PaymentsAnimation';
import { AccessibilityAnimation } from './open-pages/accessibility/AccessibilityAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialCounsellingAnimation } from './open-pages/social-counselling/SocialCounsellingAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

import style from './AreaCardGraphics.module.scss';

const areaTypeComponentMap: Record<string, React.FunctionComponent> = {
    cases: CasesAnimation,
    'employment-status-form': EmploymentStatusFormAnimation,
    payments: PaymentsAnimation,
    accessibility: AccessibilityAnimation,
    family: FamilyAnimation,
    health: HealthAnimation,
    pension: PensionAnimation,
    social_counselling: SocialCounsellingAnimation,
    work: WorkAnimation,
} as const satisfies Record<AreaCardGraphicsType, React.FunctionComponent>;

const DefaultComponent = ({ type }: { type: string }) => (
    <EditorHelp text={`Fant ingen grafikk for valgt område ${type}`} />
);

type Props = {
    type: string;
    insideCard: boolean;
};

export const AreaCardGraphics = ({ type, insideCard }: Props) => {
    const GraphicComponent = areaTypeComponentMap[type];

    return (
        <div className={classNames(style.graphics, insideCard ? style.insideCard : '')}>
            {GraphicComponent ? <GraphicComponent /> : <DefaultComponent type={type} />}
        </div>
    );
};
