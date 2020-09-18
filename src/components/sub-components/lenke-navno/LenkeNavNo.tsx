import React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Undertekst } from 'nav-frontend-typografi';
import { enonicPathToAppPath, isNavnoPath } from '../../../utils/enonic-id';
import Link from 'next/link';
import { BEM } from '../../../utils/bem';
import './LenkeNavNo.less';

type Props = {
    href: string;
    label?: string;
    className?: string;
    id?: string;
    onClick?: (e: React.MouseEvent) => void;
    withChevron?: boolean;
    children: React.ReactNode;
};

export const LenkeNavNo = ({
    href,
    label,
    className,
    id,
    onClick,
    withChevron = true,
    children,
}: Props) => {
    const bem = BEM('navno-lenke');
    const isInternalLink = isNavnoPath(href);
    const _href = isInternalLink ? enonicPathToAppPath(href) : href;

    const link = (
        <a
            href={_href}
            className={`${bem()} ${className || ''}`}
            id={id}
            onClick={onClick}
        >
            {label && <Undertekst className={bem('label')}>{label}</Undertekst>}
            <span className={bem('lenketekst')}>
                {withChevron && (
                    <span className={bem('ikon-container')}>
                        <HoyreChevron className={bem('chevron')} />
                    </span>
                )}
                {children}
            </span>
        </a>
    );

    return isInternalLink ? <Link href={_href}>{link}</Link> : link;
};
