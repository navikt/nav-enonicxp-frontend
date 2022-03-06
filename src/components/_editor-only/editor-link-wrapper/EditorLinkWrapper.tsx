import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { getRelativePathIfInternal } from '../../../utils/urls';

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

    if (!editorView || editorView === 'preview') {
        return <>{children}</>;
    }

    const child = React.Children.only(children) as React.ReactElement;

    if (!child.props) {
        return <>{children}</>;
    }

    const { className, href, onClick, target } =
        child.props as React.AnchorHTMLAttributes<HTMLAnchorElement>;

    const hrefFinal = getRelativePathIfInternal(href);

    return (
        <span
            className={className}
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();

                if (onClick) {
                    // @ts-ignore
                    onClick(e);
                }
                if (hrefFinal) {
                    if (target === '_blank') {
                        window.open(hrefFinal, target);
                    } else {
                        window.location.assign(hrefFinal);
                    }
                }
            }}
        >
            {children}
        </span>
    );
};
