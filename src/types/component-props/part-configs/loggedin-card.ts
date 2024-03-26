import { OptionSetSingle } from 'types/util-types';
import { LinkSelectable } from 'types/component-props/_mixins';

export type PartConfigLoggedinCard = {
    card: OptionSetSingle<{
        meldekort: {
            link: LinkSelectable;
        };
    }>;
};

export type LoggedInCardTypeProps = Omit<
    PartConfigLoggedinCard['card'],
    '_selected'
>;

export type LoggedInCardTypes = keyof LoggedInCardTypeProps;
