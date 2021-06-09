import React from 'react';
import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { LinkProps } from 'types/link-props';
import { MicroCardProps } from '../../../../types/component-props/parts/micro-card';
import { MicroCard } from 'components/_common/card/MicroCard';

import './Product-card-micro.less';

export const ProductCardMicroPart = ({ config }: MicroCardProps) => {
    if (!config?.targetPage) {
        return (
            <div>
                Velg en produktside eller livssituasjon for å aktivere kortet
            </div>
        );
    }

    if (!config.targetPage.data) {
        return <div>void</div>;
    }
    const determineCardType = () => {
        const pageTypeName = config.targetPage.__typename;

        if (!pageTypeName) {
            return CardType.Tool;
        }

        return pageTypeName === ContentType.ContentPageWithSidemenus
            ? CardType.Product
            : CardType.Situation;
    };

    const { targetPage } = config;

    const { _path, data } = targetPage;
    const { title } = data;

    const link: LinkProps = {
        url: _path,
        text: title,
        label: title,
    };

    return <MicroCard link={link} type={determineCardType()} />;
};
