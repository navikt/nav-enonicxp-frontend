import { OptionSetSingle } from '../../util-types';
import { LinkSelectable } from '../_mixins';

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
