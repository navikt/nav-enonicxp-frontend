import { BEM } from '../../../utils/classnames';
import { Information } from '@navikt/ds-icons';
import { Undertekst } from 'nav-frontend-typografi';

import './FilterExplanation.less';

const bem = BEM('filterExplanation');

interface FilterExplanationProps {
    filterExplanation: string;
}

export const FilterExplanation = ({
    filterExplanation,
}: FilterExplanationProps) => {
    return (
        <Undertekst className={bem()}>
            <div className={bem('iconWrapper')}>
                <Information color="#0067c5" />
            </div>
            <div className={bem('text')}>{filterExplanation}</div>
        </Undertekst>
    );
};
