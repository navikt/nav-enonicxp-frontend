import React, { useEffect } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import {
    Innholdstittel,
    Undertekst,
    Undertittel,
} from 'nav-frontend-typografi';
import { GVMessages } from './components/messages/GVMessages';
import ErrorPage404 from '../../../pages/404';
import { GVItems } from './components/values/GVItems';
import { GVAddItem } from './components/values/add-item/GVAddItem';
import { Provider } from 'react-redux';
import { gvEditorStore } from './store/gvEditorStore';
import { useGvEditorState } from './store/useGvEditorState';
import { setContentIdAction, setValueItemsAction } from './store/gvEditorState';
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

const GlobalValuesDisplay = ({ data, displayName, _id }: GlobalValuesProps) => {
    const { contentId } = useGvEditorState();

    useEffect(() => {
        hideDecorator();
    }, []);

    return (
        <div className={bem()}>
            <Innholdstittel className={bem('header')}>
                {'Globale verdier'}
            </Innholdstittel>
            <div className={bem('content')}>
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

    gvEditorStore.dispatch(setContentIdAction({ contentId: props._id }));
    gvEditorStore.dispatch(
        setValueItemsAction({ valueItems: props.data?.valueItems || [] })
    );

    return (
        <Provider store={gvEditorStore}>
            <GlobalValuesDisplay {...props} />
        </Provider>
    );
};
