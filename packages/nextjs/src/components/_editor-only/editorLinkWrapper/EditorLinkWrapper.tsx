import React, { PropsWithChildren } from 'react';
import { usePageContentProps } from 'store/pageContext';
import { getRelativePathIfInternal } from 'utils/urls';

//
// This wrapper component can be used for making links clickable in the Content Studio
// component editor. The editor captures all <a> element click events, we work around this by
// passing the relevant props to a <span> element instead.
//

export const EditorLinkWrapper = ({ children }: PropsWithChildren) => {
    const { editorView } = usePageContentProps();

    if (editorView !== 'edit') {
        return <>{children}</>;
    }

    const child = React.Children.only(children) as React.ReactElement;

    if (!child.props) {
        return <>{children}</>;
    }

    const {
        className,
        href,
        onClick,
        target,
        'aria-label': ariaLabel,
    } = child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const hrefFinal = href ? getRelativePathIfInternal(href, !!editorView) : undefined;

    const handleInteraction = (
        e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
    ) => {
        e.stopPropagation();

        if ('key' in e && e.key !== 'Enter' && e.key !== ' ') {
            return;
        }

        if ('key' in e && e.key === ' ') {
            e.preventDefault(); // Prevent page scroll on space
        }

        onClick?.(e as React.MouseEvent<HTMLAnchorElement>);

        if (hrefFinal) {
            if (target === '_blank') {
                window.open(hrefFinal, target);
            } else {
                window.location.assign(hrefFinal);
            }
        }
    };

    return (
        <span
            className={className}
            style={{ cursor: 'pointer' }}
            onClick={handleInteraction}
            onKeyDown={handleInteraction}
            role="link"
            tabIndex={0}
            aria-label={ariaLabel}
        >
            {children}
        </span>
    );
};
