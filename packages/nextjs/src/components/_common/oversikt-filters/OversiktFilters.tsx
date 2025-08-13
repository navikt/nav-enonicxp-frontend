import { useEffect } from 'react';
import { Heading } from '@navikt/ds-react';
import { OversiktOmradeFilter } from 'components/_common/oversikt-filters/oversikt-omradefilter/OversiktOmradeFilter';
import { OversiktTextFilter } from 'components/_common/oversikt-filters/text-filter/OversiktTextFilter';
import { OversiktFilterableItem, useOversiktFilters } from 'store/hooks/useOversiktFilters';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

type Props = {
    filterableItems: OversiktFilterableItem[];
    showTextInputFilter: boolean;
    showAreaFilter: boolean;
};

export const OversiktFilters = (props: Props) => {
    const { filterableItems, showTextInputFilter, showAreaFilter } = props;
    const { resetFilters } = useOversiktFilters();
    const { language } = usePageContentProps();

    useEffect(() => {
        // Reset filters when the component dismounts
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    if (!showAreaFilter && !showTextInputFilter) {
        return null;
    }

    const searchLabel = () => {
        if (showAreaFilter && showTextInputFilter) {
            return translator('oversikt', language)('omradeEllerSok');
        } else if (showAreaFilter && !showTextInputFilter) {
            return translator('oversikt', language)('omrade');
        } else if (showTextInputFilter && !showAreaFilter) {
            return translator('oversikt', language)('sok');
        }
    };

    return (
        <>
            <Heading level="2" size="xsmall">
                {searchLabel()}
            </Heading>
            {showAreaFilter && <OversiktOmradeFilter items={filterableItems} hideLabel />}
            {showTextInputFilter && <OversiktTextFilter hideLabel />}
        </>
    );
};
