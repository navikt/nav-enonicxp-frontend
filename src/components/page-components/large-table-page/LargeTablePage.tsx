import React, { useEffect } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LargeTableProps } from '../../../types/content-types/large-table-props';
import { BEM } from '../../../utils/bem';
import { makeErrorProps } from '../../../types/content-types/error-props';
import { ErrorPage } from '../error-page/ErrorPage';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import './LargeTablePage.less';

const parseHtml = (htmlString: string) => {
    const replaceEmptyRows = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (
                name?.toLowerCase() === 'tr' &&
                (!children ||
                    children.filter((col) => col.children?.length).length === 0)
            ) {
                return React.createElement('tr', {
                    ...attributesToProps(attribs),
                    className: 'empty-row',
                });
            }

            if (name?.toLowerCase() === 'strong') {
                return <>{domToReact(children)}</>;
            }
        },
    };

    const htmlParsed = htmlReactParser(
        htmlString.replace(/(\r\n|\n|\r|&nbsp;)/gm, ''),
        replaceEmptyRows
    );

    return <>{htmlParsed}</>;
};

export const LargeTablePage = (contentData: LargeTableProps) => {
    const bem = BEM('large-table-page');

    const parentPath = contentData._path.split('tabeller')[0];
    const parentTitle = parentPath
        .split('/')
        .slice(-2, -1)[0]
        .replace(/[^a-zA-Z0-9]/g, ' ');

    useEffect(() => {
        setBreadcrumbs([
            {
                title: parentTitle || 'Statistikk',
                url: parentPath,
                handleInApp: true,
            },
            { title: 'Tabeller', url: '/', handleInApp: true },
        ]);
    }, []);

    return contentData.data?.text ? (
        <div className={bem()}>{parseHtml(contentData.data.text)}</div>
    ) : (
        <ErrorPage
            {...makeErrorProps(
                contentData._path,
                'Page content not found',
                404
            )}
        />
    );
};

export default LargeTablePage;
