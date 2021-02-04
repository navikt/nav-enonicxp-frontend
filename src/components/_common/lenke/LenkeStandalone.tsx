import React from 'react';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Undertekst } from 'nav-frontend-typografi';
import { BEM } from 'utils/bem';
import { LenkeUstylet } from './LenkeUstylet';
import { getUrlFromLookupTable } from 'utils/url-lookup-table';
import './LenkeStandalone.less';

type Props = {
    href: string;
    label?: string;
    className?: string;
    component?: string;
    linkGroup?: string;
    withChevron?: boolean;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeStandalone = ({
    href,
    label,
    className,
    component,
    linkGroup,
    withChevron = true,
    children,
    analyticsLabel,
    ...rest
}: Props) => {
    const bem = BEM('navno-lenke');
    const _href = getUrlFromLookupTable(href);

    return (
        <LenkeUstylet
            href={_href}
            className={`${bem()} ${className || ''}`}
            component={component}
            linkGroup={linkGroup}
            analyticsLabel={
                analyticsLabel ||
                (typeof children === 'string' ? children : undefined)
            }
            {...rest}
        >
            <span className={bem('lenketekst')}>
                {withChevron && (
                    <span className={bem('ikon-container')}>
                        <HoyreChevron className={bem('chevron')} />
                    </span>
                )}
                {children}
            </span>
            {label && <Undertekst className={bem('label')}>{label}</Undertekst>}
        </LenkeUstylet>
    );
};
