import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { OptionSetSingle } from '../../util-types';
import { LinkSelectable } from '../_mixins';

export interface LoggedinCardProps extends PartComponentProps {
    descriptor: PartType.LoggedinCard;
    config: {
        card: OptionSetSingle<{
            meldekort: {
                link: LinkSelectable;
            };
        }>;
    };
}

export type LoggedInCardTypeProps = Omit<
    LoggedinCardProps['config']['card'],
    '_selected'
>;

export type LoggedInCardTypes = keyof LoggedInCardTypeProps;
