import React from 'react';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { HeaderWithParent } from 'components/_common/headers/headerWithParent/HeaderWithParent';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { PictogramsProps } from 'types/content-props/pictograms';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { InternalLinkMixin } from 'types/component-props/_mixins';
import FormNumberTag from 'components/_common/formNumberTag/FormNumberTag';
import style from './MellomstegLayout.module.scss';

interface Props {
    listItems: React.ReactNode;
    backLink?: InternalLinkMixin;
    editorView?: React.ReactNode;
    analyticsComponent?: string;
    allChildFormNumbers?: string[];
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        formNumbers?: string[];
        displayName?: string;
        editorial?: string;
    };
}

export const MellomstegLayout = ({
    data,
    editorView = false,
    listItems,
    backLink,
    analyticsComponent,
    allChildFormNumbers,
}: Props) => {
    const { title, illustration, textAboveTitle, editorial, formNumbers, displayName } = data;

    const currentTitle = title ?? displayName;

    return (
        <article className={style.mellomstegLayout}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <HeaderWithParent
                contentProps={{ data: { title: currentTitle } }}
                textAboveTitle={textAboveTitle}
                className={style.header}
                formNumbers={formNumbers}
            />
            {allChildFormNumbers && (
                <div className={style.formNumbers}>
                    {allChildFormNumbers.map((allChildFormNumbers) => (
                        <FormNumberTag key={allChildFormNumbers} formNumber={allChildFormNumbers} />
                    ))}
                </div>
            )}
            <div className={style.content}>
                {editorial && <ParsedHtml htmlProps={editorial} pSize="large" />}
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
                {editorView ?? null}
            </div>
        </article>
    );
};
