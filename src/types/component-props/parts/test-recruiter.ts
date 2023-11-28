import { PartComponentProps } from '../_component-common';
import { PartType } from 'types/component-props/parts';
import { TestRecruiterProps } from 'components/_common/test-recruiter/TestRecruiter';

export interface TestRecruiterPartProps extends PartComponentProps {
    descriptor: PartType.TestRecruiter;
    config: TestRecruiterProps;
}
