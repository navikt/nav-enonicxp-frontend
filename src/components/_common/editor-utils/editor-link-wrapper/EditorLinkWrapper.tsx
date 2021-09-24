import React from 'react';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';

//
// This wrapper component can be used for making links clickable in the Content Studio
// component editor. The editor captures all <a> element click events, we work around this by
// passing the relevant props to a <span> element instead.
//

type Props = {
    children: React.ReactNode;
};

export const EditorLinkWrapper = ({ children }: Props) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    if (editorView !== 'edit') {
        return <>{children}</>;
    }

    const child = React.Children.only(children) as React.ReactElement;

    if (!child.props) {
        return <>{children}</>;
    }

    const { className, href, onClick, target } =
        child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
        <span
            className={className}
            onClick={(e) => {
                if (onClick) {
                    // @ts-ignore
                    onClick(e);
                }
                if (href) {
                    window.open(href, target);
                }
            }}
        >
            {children}
        </span>
    );
};
