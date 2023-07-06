import React, { useEffect, useState } from 'react';
import { fetchJson } from 'utils/fetch/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from 'utils/urls';
import { Heading } from '@navikt/ds-react';
import { Button } from '../../../_common/button/Button';
import { EditorLinkWrapper } from '../../../_editor-only/editor-link-wrapper/EditorLinkWrapper';
import {
    CustomSelectorUsageLink,
    CustomSelectorUsageData,
} from '../../../_editor-only/custom-selector-usage-link/CustomSelectorUsageLink';

import style from './ProductDetailsUsageCheck.module.scss';

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/productDetailsSelector/usage`;

type ProductDetailsUsage = {
    usage: CustomSelectorUsageData[];
};

const fetchProductDetailsUsage = (id: string) =>
    fetchJson<ProductDetailsUsage>(`${serviceUrl}?id=${id}`, 5000);

type Props = {
    id: string;
};

export const ProductDetailsUsageCheck = ({ id }: Props) => {
    const [usages, setUsages] = useState<CustomSelectorUsageData[] | null>(
        null
    );
    const [showUsage, setShowUsage] = useState(false);

    useEffect(() => {
        fetchProductDetailsUsage(id).then((response) => {
            if (!response?.usage) {
                console.error('Invalid usage-check fetch response');
                return;
            }

            setUsages(response.usage);
        });
    }, [id]);

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
                            {`Produktdetaljene er i bruk på ${usagesLength} publisert${
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
                        {`Produktdetaljene er ikke i bruk på publiserte sider`}
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
