import dynamic from 'next/dynamic';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PartType } from 'types/component-props/parts';
import { ComponentsMappingProvider } from './component-map-context/componentMapContext';

const GuidePage = dynamic(() =>
    import('../pages/guide-page/GuidePage').then((module) => module.GuidePage)
);

const ContentMapperOld = dynamic(() =>
    import('components/ContentMapper').then((module) => module.ContentMapper)
);

type Props = {
    content: ContentProps;
};

export const ContentMapperNew = ({ content }: Props) => {
    switch (content.type) {
        case ContentType.GuidePage:
            return (
                <ComponentsMappingProvider
                    componentsMapping={{
                        parts: { [PartType.Button]: () => <div>{'Hei hei, jeg er en knapp'}</div> },
                    }}
                >
                    <GuidePage {...content} />
                </ComponentsMappingProvider>
            );
        default:
            return <ContentMapperOld content={content} />;
    }
};
