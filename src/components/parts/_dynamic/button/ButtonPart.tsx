import React from 'react';
import { ButtonPartProps } from '../../../../types/component-props/parts/button';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import { getSelectableLinkProps } from '../../../../utils/links-from-content';
import { BEM, classNames } from '../../../../utils/classnames';
import { XpImage } from '../../../_common/image/XpImage';
import './ButtonPart.less';

const bemDs = BEM('knapp');
const bemPart = BEM('button-part');

export const ButtonPart = ({ config }: ButtonPartProps) => {
    const { icon, link, size, type, fullwidth } = config;

    const linkProps = getSelectableLinkProps(link);

    return (
        <LenkeBase
            href={linkProps.url}
            className={classNames(
                bemPart(),
                fullwidth && bemPart('fullwidth'),
                bemDs(),
                bemDs(undefined, type),
                size !== 'normal' && bemDs(undefined, size)
            )}
        >
            {icon ? (
                <>
                    <XpImage
                        imageProps={icon}
                        className={bemPart('icon')}
                        alt={''}
                    />
                    <span>{linkProps.text}</span>
                </>
            ) : (
                <>{linkProps.text}</>
            )}
        </LenkeBase>
    );
};
