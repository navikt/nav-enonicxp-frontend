import React, { useEffect, useState } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import { Select, Heading } from '@navikt/ds-react';
import { GVMessages } from './components/messages/GVMessages';
import ErrorPage404 from '../../../pages/404';
import { GVAddItem } from './components/values/add-item/GVAddItem';
import {
    setContentIdAction,
    setValueItemsAction,
} from '../../../store/slices/gvEditorState';
import { store } from '../../../store/store';
import { GVItemsOrdered } from './components/values/GVItemsOrdered';
import { GVItemsAlphabetical } from './components/values/GVItemsAlphabetical';
import './GlobalValuesPage.less';

const bem = BEM('global-values-page');

type GlobalValueSortOrder = 'default' | 'alphabetical';

const GlobalValuesDisplay = ({ displayName }: GlobalValuesProps) => {
    const [sortOrder, setSortOrder] = useState<GlobalValueSortOrder>('default');

    useEffect(() => {
        const header = document.getElementById('decorator-header');
        if (header) {
            header.style.display = 'none';
        }

        const footer = document.getElementById('decorator-footer');
        if (footer) {
            footer.style.display = 'none';
        }

        // Hide overlay-elements in the editor
        const callback = (mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.target.classList.contains('xp-page-editor-shader')
                ) {
                    mutation.target.style.display = 'none';
                }
            });
        };

        const observer = new MutationObserver(callback);
        const config = {
            childList: true,
            subtree: true,
            attributes: true,
        };
        observer.observe(window.document, config);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={bem()}>
            <div className={bem('header-row')}>
                <Heading level="1" size="xlarge" className={bem('header')}>
                    {'Globale verdier'}
                </Heading>
                <Select
                    size={'small'}
                    label={'Sortering'}
                    hideLabel={true}
                    onChange={(e) => {
                        const selection = e.target.value;
                        if (selection) {
                            setSortOrder(selection as GlobalValueSortOrder);
                        }
                    }}
                    className={bem('sort-selector')}
                >
                    <option value={''}>{'Velg sortering'}</option>
                    <option value={'default'}>{'Egendefinert'}</option>
                    <option value={'alphabetical'}>{'Alfabetisk'}</option>
                </Select>
            </div>
            <div className={bem('content')}>
                <div className={bem('left-col')}>
                    <div className={bem('sub-header-row')}>
                        <div className={bem('sub-header')}>
                            <Heading
                                level="2"
                                size="medium"
                                className={bem('header-category')}
                            >{`Kategori: ${displayName}`}</Heading>
                        </div>
                        <GVAddItem />
                    </div>
                    <hr />
                    {sortOrder === 'default' ? (
                        <GVItemsOrdered />
                    ) : (
                        <GVItemsAlphabetical />
                    )}
                </div>
                <GVMessages />
            </div>
        </div>
    );
};

// This is a page for editors only and should return 404 publically
export const GlobalValuesPage = (props: GlobalValuesProps) => {
    if (!props.editorView) {
        return <ErrorPage404 />;
    }

    store.dispatch(setContentIdAction({ contentId: props._id }));
    store.dispatch(
        setValueItemsAction({ valueItems: props.data?.valueItems || [] })
    );

    return <GlobalValuesDisplay {...props} />;
};
