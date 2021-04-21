import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { XpImageProps } from '../../../types/media';
import { XpImage } from '../image/XpImage';
import { KnappBaseProps } from 'nav-frontend-knapper';
import './Button.less';

const bem = BEM('knapp');

type Props = {
    href: string;
    type: KnappBaseProps['type'];
    icon?: XpImageProps;
    mini?: boolean;
    kompakt?: boolean;
    fullWidth?: boolean;
    className?: string;
    children: React.ReactNode;
};

export const Button = ({
    href,
    type,
    icon,
    mini,
    kompakt,
    className,
    children,
}: Props) => {
    return (
        <LenkeBase
            href={href}
            className={classNames(
                bem(),
                bem(undefined, type),
                mini && bem(undefined, 'mini'),
                kompakt && bem(undefined, 'kompakt'),
                bem('custom'),
                className
            )}
        >
            {icon ? (
                <>
                    <XpImage
                        imageProps={icon}
                        className={bem('icon')}
                        alt={''}
                    />
                    <span>{children}</span>
                </>
            ) : (
                <>{children}</>
            )}
        </LenkeBase>
    );
};
