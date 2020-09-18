import React, { useEffect } from 'react';
import { ContentType, ContentTypeSchemas } from '../../types/schemas/_schemas';
import { SectionPage } from '../page-components/section-page/SectionPage';
import LegacyHtml from '../page-components/legacy-html/LegacyHtml';
import { useRouter } from 'next/router';
import { enonicPathToAppPath } from '../../utils/enonic-path';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import Head from 'next/head';
import { TransportPage } from '../page-components/transport-page/TransportPage';

export const contentToComponentMap = {
    [ContentType.NotImplemented]: LegacyHtml,
    [ContentType.SectionPage]: SectionPage,
    [ContentType.TransportPage]: TransportPage,
};

type Props = {
    contentData: ContentTypeSchemas | undefined;
};

const ContentComponentMapper = ({ contentData }: Props) => {
    const router = useRouter();

    useEffect(() => {
        if (!contentData) {
            return;
        }

        setBreadcrumbs([
            {
                title: contentData.displayName,
                url: enonicPathToAppPath(contentData._path),
            },
        ]);

        // Ensures the url displayed in the browser is correct after static redirection
        if (contentData.didRedirect) {
            router.replace(enonicPathToAppPath(contentData._path), undefined, {
                shallow: true,
            });
        }
    }, [contentData]);

    if (!contentData) {
        return null;
    }

    const Component = contentToComponentMap[contentData.type];

    return (
        <>
            <Head>
                <title>{`${contentData.displayName} - nav.no`}</title>
            </Head>
            <Component {...contentData} />
        </>
    );
};

export default ContentComponentMapper;
