import dynamic from 'next/dynamic';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { XpComponentsConfigProvider } from './xp-components/xpComponentsConfig';

const GuidePage = dynamic(() =>
    import('./pages/guide-page/GuidePage').then((module) => module.GuidePage)
);

const ContentMapperOld = dynamic(() =>
    import('./ContentMapperOld').then((module) => module.ContentMapperOld)
);

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    switch (content.type) {
        case ContentType.GuidePage:
            return <GuidePage {...content} />;
        default:
            return (
                <XpComponentsConfigProvider config={{ useGlobalFallback: true }}>
                    <ContentMapperOld content={content} />
                </XpComponentsConfigProvider>
            );
    }
};
