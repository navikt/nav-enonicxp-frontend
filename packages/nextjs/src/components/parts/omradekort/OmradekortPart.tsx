import React from 'react';
import { getSelectableLinkProps } from 'utils/links-from-content';
import { Omradekort } from 'components/_common/omradekort/Omradekort';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { LinkSelectable } from 'types/component-props/_mixins';

export type OmradekortGraphicsType =
    | 'payments'
    | 'cases'
    | 'employment-status-form'
    | 'work'
    | 'family'
    | 'health'
    | 'accessibility'
    | 'pension'
    | 'social_counselling';

export type PartConfigOmradekort = {
    link: LinkSelectable;
    area: OmradekortGraphicsType;
};

export const OmradekortPart = ({ config }: PartComponentProps<PartType.Omradekort>) => {
    if (!config) {
        return <EditorHelp text={'Kortet mangler konfigurasjon'} />;
    }

    const { link, area } = config;
    const linkProps = getSelectableLinkProps(link);

    return <Omradekort path={linkProps.url} title={linkProps.text} area={area} />;
};
