import React from 'react';
import { Heading } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { ContentType } from 'types/content-props/_content-common';
import { cardTypeMap } from 'components/_common/card/card-utils';

type Props = {
    type: ContentType;
    url: string;
    title: string;
};

export const FormsOverviewProductLink = ({ url, type, title }: Props) => {
    return (
        <>
            <Heading level={'3'} size={'small'}>
                {'Mer om'}
            </Heading>
            <MicroCard
                type={cardTypeMap[type]}
                link={{ url: url, text: title }}
            />
        </>
    );
};
