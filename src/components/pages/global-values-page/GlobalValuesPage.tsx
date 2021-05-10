import React, { useEffect, useState } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import {
    Innholdstittel,
    Undertekst,
    Undertittel,
} from 'nav-frontend-typografi';
import { GVMessages, MessageProps } from './messages/GVMessages';
import ErrorPage404 from '../../../pages/404';
import { GVItems } from './values/GVItems';
import { GVAddItem } from './values/add-item/GVAddItem';
import './GlobalValuesPage.less';

const bem = BEM('global-values-page');

const hideDecorator = () => {
    const header = document.getElementById('decorator-header');
    if (header) {
        header.style.display = 'none';
    }

    const footer = document.getElementById('decorator-footer');
    if (footer) {
        footer.style.display = 'none';
    }
};

const GlobalValuesDisplay = ({
    data,
    displayName,
    _id: contentId,
}: GlobalValuesProps) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const { valueItems = [] } = data;

    useEffect(() => {
        hideDecorator();
    }, []);

    return (
        <div className={bem()}>
            <Innholdstittel className={bem('header')}>
                {'Globale verdier'}
            </Innholdstittel>
            <div className={bem('left-col')}>
                <div className={bem('sub-header-row')}>
                    <div className={bem('sub-header')}>
                        <Undertittel
                            className={bem('header-category')}
                        >{`Kategori: ${displayName}`}</Undertittel>
                        <Undertekst
                            className={bem('header-id')}
                        >{`Kategori-id: ${contentId}`}</Undertekst>
                    </div>
                    <GVAddItem allItems={valueItems} contentId={contentId} />
                </div>
                <GVItems items={valueItems} contentId={contentId} />
            </div>
            <GVMessages messages={messages} />
        </div>
    );
};

// This is a helper page for editors and should return 404 publically
export const GlobalValuesPage = (props: GlobalValuesProps) => {
    if (!props.editMode) {
        return <ErrorPage404 />;
    }

    return <GlobalValuesDisplay {...props} />;
};
