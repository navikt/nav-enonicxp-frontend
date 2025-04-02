import React from 'react';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { HeaderWithParent } from 'components/_common/headers/headerWithParent/HeaderWithParent';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { PictogramsProps } from 'types/content-props/pictograms';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { InternalLinkMixin } from 'types/component-props/_mixins';
import style from './MellomstegLayout.module.scss';

interface Props {
    listItems: React.ReactNode;
    backLink?: InternalLinkMixin;
    editorView?: React.ReactNode;
    analyticsComponent?: string;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        formNumbers?: string[];
        displayName?: string;
        html?: string;
        editorial?: string;
    };
}

export const MellomstegLayout = ({
    data,
    editorView = false,
    listItems,
    backLink,
    analyticsComponent,
}: Props) => {
    const { title, illustration, textAboveTitle, html, formNumbers, displayName, editorial } = data;

    const currentTitle = title ?? displayName;
    const currentHtml = html ?? editorial; //fordi formIntermediateStepPage har editorial i stedet for html

    return (
        <div className={style.mellomstegLayout}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <HeaderWithParent
                contentProps={{ data: { title: currentTitle } }}
                textAboveTitle={textAboveTitle}
                className={style.header}
                formNumbers={formNumbers}
            />
            <div className={style.content}>
                {currentHtml && <ParsedHtml htmlProps={currentHtml} />}
                <ul className={style.stepList}>{listItems}</ul>
                {backLink ? (
                    <LenkeInline
                        href={backLink.target._path}
                        analyticsComponent={analyticsComponent}
                        analyticsLabel="Tilbake"
                    >
                        {backLink.target.displayName}
                    </LenkeInline>
                ) : null}
            </div>
            {editorView ?? null}
        </div>
    );
};
