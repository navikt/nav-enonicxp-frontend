import React, { useEffect, useState } from 'react';
import { GlobalValuesProps } from '../../../types/content-props/global-values-props';
import { BEM } from '../../../utils/classnames';
import { Heading, Select } from '@navikt/ds-react';
import { GVMessages } from './components/messages/GVMessages';
import ErrorPage404 from '../../../pages/404';
import { GVAddItem } from './components/values/add-item/GVAddItem';
import {
    setContentIdAction,
    setValueItemsAction,
} from '../../../store/slices/gvEditorState';
import { store } from '../../../store/store';
import { GVItemsCustomOrder } from './components/values/GVItemsCustomOrder';
import { GVItemsSorted } from './components/values/GVItemsSorted';
import { useGvEditorState } from '../../../store/hooks/useGvEditorState';
import { ContentType } from '../../../types/content-props/_content-common';
import Head from 'next/head';
import { DocumentParameter } from '../../_common/metatags/DocumentParameterMetatags';

const bem = BEM('global-values-page');

type ListOrder = 'custom' | 'sorted';

const GlobalValuesDisplay = ({
    displayName,
    __typename,
}: GlobalValuesProps) => {
    const { valueItems } = useGvEditorState();
    const [listOrder, setListOrder] = useState<ListOrder>('custom');

    useEffect(() => {
        // Hide overlay elements in the editor-view, which prevents interaction
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
            <Head>
                <meta
                    name={DocumentParameter.DecoratorDisabled}
                    content={'true'}
                />
            </Head>
            <div className={bem('header-row')}>
                <Heading level="1" size="large" className={bem('header')}>
                    {__typename === ContentType.GlobalCaseTimeSet
                        ? 'Saksbehandlingstider'
                        : 'Globale verdier'}
                </Heading>
                <Select
                    size={'small'}
                    label={'Sortering'}
                    defaultValue={''}
                    hideLabel={true}
                    onChange={(e) => {
                        const selection = e.target.value;
                        if (selection) {
                            setListOrder(selection as ListOrder);
                        }
                    }}
                    className={bem('sort-selector')}
                >
                    <option value={''} disabled={true}>
                        {'Velg sortering'}
                    </option>
                    <option value={'custom'}>{'Egendefinert'}</option>
                    <option value={'sorted'}>{'Alfabetisk'}</option>
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
                            >
                                {displayName}
                            </Heading>
                        </div>
                        <GVAddItem
                            type={
                                __typename === ContentType.GlobalCaseTimeSet
                                    ? 'caseTime'
                                    : 'numberValue'
                            }
                        />
                    </div>
                    {listOrder === 'sorted' || valueItems.length < 2 ? (
                        <GVItemsSorted />
                    ) : (
                        <GVItemsCustomOrder />
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
