import React from 'react';
import { classNames } from 'utils/classnames';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { OmradekortGraphicsType } from 'components/parts/omradekort/OmradekortPart';
import { CasesAnimation } from './innlogget/cases/CasesAnimation';
import { EmploymentStatusFormAnimation } from './innlogget/employment-status-form/EmploymentStatusFormAnimation';
import { PaymentsAnimation } from './innlogget/payments/PaymentsAnimation';
import { AccessibilityAnimation } from './open-pages/accessibility/AccessibilityAnimation';
import { FamilyAnimation } from './open-pages/family/FamilyAnimation';
import { HealthAnimation } from './open-pages/health/HealthAnimation';
import { PensionAnimation } from './open-pages/pension/PensionAnimation';
import { SocialCounsellingAnimation } from './open-pages/social-counselling/SocialCounsellingAnimation';
import { WorkAnimation } from './open-pages/work/WorkAnimation';

import style from './OmradekortGraphics.module.scss';

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
} as const satisfies Record<OmradekortGraphicsType, React.FunctionComponent>;

const DefaultComponent = ({ type }: { type: string }) => (
    <EditorHelp text={`Fant ingen grafikk for valgt område ${type}`} />
);

type Props = {
    type: string;
    insideCard: boolean;
};

export const OmradekortGraphics = ({ type, insideCard }: Props) => {
    const GraphicComponent = areaTypeComponentMap[type];

    return (
        <div className={classNames(style.graphics, insideCard ? style.insideCard : '')}>
            {GraphicComponent ? <GraphicComponent /> : <DefaultComponent type={type} />}
        </div>
    );
};
