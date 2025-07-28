import React from 'react';
import { BodyLong, BodyShort, Heading, Loader } from '@navikt/ds-react';
import { ReferencesInfoResult } from 'components/_editor-only/references-info/result/ReferencesInfoResult';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import { useFetchReferencesInfo } from 'components/_editor-only/references-info/useFetchReferencesInfo';
import { ContentProps } from 'types/content-props/_content-common';
import style from './ReferencesInfo.module.scss';

type Props = {
    content: ContentProps;
};

// Shows outbound references for the content when viewed in the editor. This is a more thorough
// alternative to the builtin dependencies widget in content studio, which does not account for
// various types of custom references that we have implemented.
export const ReferencesInfo = ({ content }: Props) => {
    const { _id: contentId, contentLayer } = content;

    const { references } = useFetchReferencesInfo(contentId, contentLayer);

    if (references.result === 'notimpl') {
        return null;
    }

    const renderContent = () => {
        if (references.result === 'loading') {
            return (
                <div className={style.loader}>
                    <Loader size={'xlarge'} />
                    <BodyShort>{'Laster avhengigheter...'}</BodyShort>
                </div>
            );
        }

        if (references.result === 'error') {
            return (
                <Varselboks variant={'error'} inline={true}>
                    <Heading level={'3'} size={'small'}>
                        {`Feil: ${references.message}`}
                    </Heading>
                    <BodyLong>{'Forsøk å laste inn editoren på nytt.'}</BodyLong>
                </Varselboks>
            );
        }

        return <ReferencesInfoResult references={references.references} content={content} />;
    };

    return <div className={style.container}>{renderContent()}</div>;
};
