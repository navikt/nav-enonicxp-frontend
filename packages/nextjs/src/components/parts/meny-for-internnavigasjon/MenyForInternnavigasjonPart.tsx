import React from 'react';
import { MenyForInternnavigasjon } from 'components/_common/menyForInternnavigasjon/MenyForInternnavigasjon';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
    isPartRelatedSituations?: boolean;
};

export type PartConfigMenyForInternnavigasjon = {
    anchorLinks: AnchorLink[];
};

export const MenyForInternnavigasjonPart = ({
    config,
}: PartComponentProps<PartType.MenyForInternnavigasjon>) => {
    const { language } = usePageContentProps();
    const getLabel = translator('internnavigasjon', language);

    if (!config) {
        return null;
    }

    return (
        <MenyForInternnavigasjon
            anchorLinks={config.anchorLinks}
            title={getLabel('menyForInternnavigasjon')}
            isChapterNavigation
        />
    );
};
