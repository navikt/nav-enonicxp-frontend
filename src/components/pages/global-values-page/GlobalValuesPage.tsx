import React, { useEffect } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import { Title } from '@navikt/ds-react';
import { GVMessages } from './components/messages/GVMessages';
import ErrorPage404 from '../../../pages/404';
import { GVItems } from './components/values/GVItems';
import { GVAddItem } from './components/values/add-item/GVAddItem';
import {
    setContentIdAction,
    setValueItemsAction,
} from '../../../store/slices/gvEditorState';
import { store } from '../../../store/store';
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

const GlobalValuesDisplay = ({ displayName }: GlobalValuesProps) => {
    useEffect(() => {
        hideDecorator();
    }, []);

    return (
        <div className={bem()}>
            <Title level={1} size="xl" className={bem('header')}>
                {'Globale verdier'}
            </Title>
            <div className={bem('content')}>
                <div className={bem('left-col')}>
                    <div className={bem('sub-header-row')}>
                        <div className={bem('sub-header')}>
                            <Title
                                level={2}
                                size="m"
                                className={bem('header-category')}
                            >{`Kategori: ${displayName}`}</Title>
                        </div>
                        <GVAddItem />
                    </div>
                    <GVItems />
                </div>
                <GVMessages />
            </div>
        </div>
    );
};

// This is a page for editors only and should return 404 publically
export const GlobalValuesPage = (props: GlobalValuesProps) => {
    if (!props.editMode) {
        return <ErrorPage404 />;
    }

    store.dispatch(setContentIdAction({ contentId: props._id }));
    store.dispatch(
        setValueItemsAction({ valueItems: props.data?.valueItems || [] })
    );

    return <GlobalValuesDisplay {...props} />;
};
