import React from 'react';
import htmlReactParser from 'html-react-parser';
import { LargeTableProps } from '../../../types/content-types/large-table-props';

const xpOrigin = process.env.XP_ORIGIN;

const parseHtml = (htmlString: string) => {
    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        htmlString.replace(/(\r\n|\n|\r)/gm, '')
    );

    return <>{htmlParsed}</>;
};

export const LargeTablePage = (contentData: LargeTableProps) => (
    <div className={'large-table-page'}>
        {contentData.data?.text && parseHtml(contentData.data.text)}
    </div>
);

export default LargeTablePage;
