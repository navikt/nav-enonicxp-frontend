import React from 'react';
import { ComponentMapper } from '../../ComponentMapper';
import {
    GenericPageProps,
    ProductPageProps,
} from '../../../types/content-props/dynamic-page-props';
import { ThemedPageHeader } from '../../_common/headers/themed-page-header/ThemedPageHeader';

export const GenericPage = (props: GenericPageProps) => {
    return (
        <div className={'genericPage'}>
            <ThemedPageHeader contentProps={props} />
            <div className={'content'}>
                <ComponentMapper
                    componentProps={props.page}
                    pageProps={props}
                />
            </div>
        </div>
    );
};
