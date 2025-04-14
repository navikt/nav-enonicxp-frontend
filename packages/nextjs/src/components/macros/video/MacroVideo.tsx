import React, { useEffect, useState } from 'react';
import { MacroVideoProps } from 'types/macro-props/video';
import { usePageContentProps } from 'store/pageContext';
import { QbrickVideo } from 'components/_common/qbrick-video/QbrickVideo';
import {
    buildQbrickVideoProps,
    buildQbrickVideoPropsLegacy,
    QbrickVideoProps,
} from 'components/_common/qbrick-video/utils/videoProps';
import { fetchQbrickMissingProps } from 'components/_common/qbrick-video/utils/videoHelpers';

const buildVideoProps = (macroConfig: MacroVideoProps['config'], contentLanguage: string) => {
    const { targetContent, video, title, language } = macroConfig.video;
    return targetContent?.data
        ? buildQbrickVideoProps(targetContent.data, language ?? contentLanguage)
        : buildQbrickVideoPropsLegacy(title, video);
};

export const MacroVideo = ({ config }: MacroVideoProps) => {
    const { language } = usePageContentProps();

    const [videoProps, setVideoProps] = useState<QbrickVideoProps | null>(
        buildVideoProps(config, language)
    );

    useEffect(() => {
        if (!videoProps || videoProps.poster) {
            return;
        }

        // Whether the video is in new content or legacy, attempt
        // to get the poster and duration if none is given in the content config.
        fetchQbrickMissingProps(videoProps).then((newProps) => {
            if (newProps) {
                setVideoProps(newProps);
            }
        });
    }, [videoProps]);

    if (!videoProps) {
        return null;
    }

    return <QbrickVideo {...videoProps} />;
};
