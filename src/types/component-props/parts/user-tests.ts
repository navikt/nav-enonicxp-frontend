import { PartComponentProps } from '../_component-common';
import { PartType } from 'types/component-props/parts';
import { UserTestsComponentProps } from 'components/_common/user-tests/UserTests';

export interface UserTestsPartProps extends PartComponentProps {
    descriptor: PartType.UserTests;
    config: UserTestsComponentProps;
}
