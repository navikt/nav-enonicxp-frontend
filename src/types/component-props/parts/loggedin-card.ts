import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { OptionSetSingle } from 'types/util-types';
import { LinkSelectable } from 'types/component-props/_mixins';

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

export type LoggedInCardTypeProps = Omit<LoggedinCardProps['config']['card'], '_selected'>;

export type LoggedInCardTypes = keyof LoggedInCardTypeProps;
