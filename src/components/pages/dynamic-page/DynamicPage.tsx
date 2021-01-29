import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { ComponentType } from '../../../types/component-props/_component-common';
import Region from '../../layouts/Region';

export const DynamicPage = (props: ContentProps) => {
    const { regions } = props.page;

    const editorProps = props.editMode
        ? {
              'data-portal-component-type': ComponentType.Page,
              'data-portal-component': props.page.path,
          }
        : undefined;

    return regions ? (
        <div {...editorProps}>
            {Object.values(regions).map((region, index) => (
                <Region pageProps={props} regionProps={region} key={index} />
            ))}
        </div>
    ) : (
        <div data-portal-region={'main'} />
    );
};
