import dynamic from 'next/dynamic';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PartType } from 'types/component-props/parts';
import { ButtonPartTwo } from './parts/button/ButtonPart';
import { XpComponentsConfigProvider } from './xp-components/components-config/xpComponentsConfig';

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
            return (
                <XpComponentsConfigProvider
                    config={{
                        parts: { [PartType.Button]: ButtonPartTwo },
                    }}
                >
                    <GuidePage {...content} />
                </XpComponentsConfigProvider>
            );
        default:
            return (
                <XpComponentsConfigProvider config={{ useGlobalFallback: true }}>
                    <ContentMapperOld content={content} />
                </XpComponentsConfigProvider>
            );
    }
};
