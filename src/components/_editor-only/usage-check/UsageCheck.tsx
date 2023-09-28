import React, { useEffect, useState } from 'react';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { xpServicePath } from 'utils/urls';
import { xpPreviewBasePathDefault } from 'components/_editor-only/utils/editor-urls';
import { Heading } from '@navikt/ds-react';
import { Button } from '../../_common/button/Button';
import { EditorLinkWrapper } from '../editor-link-wrapper/EditorLinkWrapper';
import {
    CustomSelectorUsageLink,
    CustomSelectorUsageData,
} from '../custom-selector-usage-link/CustomSelectorUsageLink';
import { ContentType } from 'types/content-props/_content-common';

import style from './UsageCheck.module.scss';

const serviceUrl = {
    [ContentType.ProductDetails]: `${xpPreviewBasePathDefault}${xpServicePath}/productDetailsSelector/usage`,
    [ContentType.Video]: `${xpPreviewBasePathDefault}${xpServicePath}/video/usage`,
};

const usageNaming = {
    [ContentType.ProductDetails]: 'Produktdetaljene',
    [ContentType.Video]: 'Videoen',
};

type ProductDetailsUsage = {
    usage: CustomSelectorUsageData[];
};

type Props = {
    id: string;
    type: ContentType;
};

const fetchUsageFromService = (id: string, type: ContentType) => {
    return fetchJson<ProductDetailsUsage>(`${serviceUrl[type]}?id=${id}`, 5000);
};

export const UsageCheck = ({ id, type }: Props) => {
    const [usages, setUsages] = useState<CustomSelectorUsageData[] | null>(
        null
    );
    const [showUsage, setShowUsage] = useState(false);

    useEffect(() => {
        if (!id || !type) {
            return;
        }
        fetchUsageFromService(id, type).then((response) => {
            if (!response?.usage) {
                console.error('Invalid usage-check fetch response');
                return;
            }

            setUsages(response.usage);
        });
    }, [id, type]);

    if (!usages) {
        return null;
    }

    const usagesLength = usages.length;

    return (
        <div className={style.usage}>
            <div className={style.header}>
                {usagesLength > 0 ? (
                    <>
                        <Heading level="3" size="medium">
                            {`${
                                usageNaming[type]
                            } er i bruk på ${usagesLength} publisert${
                                usagesLength === 1 ? '' : 'e'
                            } side${usagesLength === 1 ? '' : 'r'}`}
                        </Heading>
                        <EditorLinkWrapper>
                            <Button
                                variant={'tertiary'}
                                size={'small'}
                                className={style.button}
                                onClick={() => setShowUsage(!showUsage)}
                            >
                                {showUsage ? 'Skjul' : 'Vis'}
                            </Button>
                        </EditorLinkWrapper>
                    </>
                ) : (
                    <Heading level="3" size="small">
                        {`${usageNaming[type]}  er ikke i bruk på publiserte sider`}
                    </Heading>
                )}
            </div>
            {showUsage && (
                <div>
                    <Heading
                        level="3"
                        size="small"
                        className={style.usageHeader}
                    >
                        {'I bruk på følgende sider:'}
                    </Heading>
                    {usages.map((content, index) => (
                        <CustomSelectorUsageLink {...content} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};
