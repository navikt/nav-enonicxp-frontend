import React, { useEffect, useState } from 'react';
import { GlobalValuesProps } from 'types/content-props/global-values-props';
import { Select, Heading } from '@navikt/ds-react';
import { GVMessages } from './components/messages/GVMessages';
import { GVAddItem } from './components/values/add-item/GVAddItem';
import {
    setContentIdAction,
    setEditorEnabledAction,
    setValueItemsAction,
} from 'store/slices/gvEditorState';
import { store } from 'store/store';
import { GVItemsCustomOrder } from './components/values/GVItemsCustomOrder';
import { GVItemsSorted } from './components/values/GVItemsSorted';
import { useGvEditorState } from 'store/hooks/useGvEditorState';
import { ContentType } from 'types/content-props/_content-common';
import Head from 'next/head';
import { DocumentParameter } from '../../_common/metatags/DocumentParameterMetatags';
import Config from 'config';

import style from './GlobalValuesPage.module.scss';

type ListOrder = 'custom' | 'sorted';

const isElement = (node: Node): node is Element & ElementCSSInlineStyle =>
    node.nodeType === node.ELEMENT_NODE;

const GlobalValuesDisplay = ({ displayName, type }: GlobalValuesProps) => {
    const { valueItems, editorEnabled } = useGvEditorState();
    const [listOrder, setListOrder] = useState<ListOrder>('custom');

    useEffect(() => {
        // Hide overlay elements in the editor-view, which prevents interaction
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    isElement(mutation.target) &&
                    mutation.target.classList.contains('xp-page-editor-shader')
                ) {
                    mutation.target.style.display = 'none';
                }
            });
        });

        const config = {
            childList: true,
            subtree: true,
            attributes: true,
        };
        observer.observe(window.document, config);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={style.globalValuesPage}>
            <Head>
                <meta
                    name={DocumentParameter.DecoratorDisabled}
                    content={'true'}
                />
            </Head>
            <div className={style.headerRow}>
                <Heading level={'1'} size={'large'}>
                    {type === ContentType.GlobalCaseTimeSet
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
                    className={style.sortSelector}
                >
                    <option value={''} disabled={true}>
                        {'Velg sortering'}
                    </option>
                    <option value={'custom'}>{'Egendefinert'}</option>
                    <option value={'sorted'}>{'Alfabetisk'}</option>
                </Select>
            </div>
            {!editorEnabled && (
                <Heading level={'2'} size={'medium'}>
                    {
                        'Kan bare redigeres i "topp-laget" - skal ikke lokaliseres!'
                    }
                </Heading>
            )}
            <div className={style.content}>
                <div className={style.leftCol}>
                    <div className={style.subHeaderRow}>
                        <Heading level="2" size="medium">
                            {displayName}
                        </Heading>
                        {editorEnabled && (
                            <GVAddItem
                                type={
                                    type === ContentType.GlobalCaseTimeSet
                                        ? 'caseTime'
                                        : 'numberValue'
                                }
                            />
                        )}
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

export const GlobalValuesPage = (props: GlobalValuesProps) => {
    store.dispatch(setContentIdAction({ contentId: props._id }));
    store.dispatch(
        setValueItemsAction({ valueItems: props.data?.valueItems || [] })
    );
    store.dispatch(
        setEditorEnabledAction(props.layerLocale === Config.vars.defaultLocale)
    );

    return <GlobalValuesDisplay {...props} />;
};
