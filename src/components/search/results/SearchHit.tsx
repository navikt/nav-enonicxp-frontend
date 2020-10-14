import React from 'react';
import { SearchHitProps } from '../../../types/search/search-result';
import LenkepanelNavNo from '../../part-components/_common/lenkepanel/LenkepanelNavNo';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { BEM } from '../../../utils/bem';
import { formatDate } from '../../../utils/datetime';
import './SearchHit.less';

const createPublishedAndModifiedString = (
    publish: SearchHitProps['publish'],
    modifiedTime: SearchHitProps['modifiedTime']
) => {
    const publishedTime = publish.from || publish.first;
    const publisedString = publishedTime
        ? `Publisert ${formatDate(publishedTime)}`
        : '';
    const modifiedString = modifiedTime
        ? `${publisedString ? ' - ' : ''}Sist endret ${formatDate(
              modifiedTime
          )}`
        : '';
    return `${publisedString}${modifiedString}`;
};

export const SearchHit = (props: SearchHitProps) => {
    const {
        displayName,
        href,
        displayPath,
        highlight,
        publish,
        modifiedTime,
    } = props;

    if (!displayName || !href) {
        return null;
    }

    const bem = BEM('search-hit');

    const publishedString = createPublishedAndModifiedString(
        publish,
        modifiedTime
    );

    return (
        <LenkepanelNavNo href={href} tittel={displayName} className={bem()}>
            <Undertekst className={bem('display-path')}>
                {displayPath}
            </Undertekst>
            {highlight && (
                <Normaltekst className={bem('highlight')}>
                    {highlight}
                </Normaltekst>
            )}
            {publishedString && (
                <Undertekst className={bem('published')}>
                    {publishedString}
                </Undertekst>
            )}
        </LenkepanelNavNo>
    );
};
