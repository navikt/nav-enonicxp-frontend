import React, { useEffect, useState } from 'react';
import { Header } from '../../../../_common/headers/Header';
import { classNames } from '../../../../../utils/classnames';
import { ContentType } from '../../../../../types/content-props/_content-common';
import { IndexPageContentProps } from '../../IndexPage';

import style from './FrontPageHeader.module.scss';

type Props = {
    content: IndexPageContentProps;
};

export const FrontPageHeader = ({ content }: Props) => {
    const { __typename, data } = content;

    const [header, setHeader] = useState(
        __typename === ContentType.FrontPage ? data.areasHeader : ''
    );

    useEffect(() => {
        if (content.__typename === ContentType.FrontPage) {
            setHeader(content.data.areasHeader);
        }
    }, [content]);

    return (
        <Header
            level={'2'}
            justify={'left'}
            size={'large'}
            className={classNames(
                style.frontpageHeader,
                __typename !== ContentType.FrontPage && style.hidden
            )}
        >
            {header}
        </Header>
    );
};
