import React from 'react';
import { ContactPageHeader } from 'components/_common/headers/contactPageHeader/ContactPageHeader';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { PictogramsProps } from 'types/content-props/pictograms';
import style from './ContactStepPage.module.scss';

export type ContactStepPageProps = ContentCommonProps & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html: string;
    };
};

export const ContactStepPage = (props: ContactStepPageProps) => {
    const { data } = props;
    const { title, html, textAboveTitle, illustration } = data;

    return (
        <div className={style.contactStepPage}>
            <IllustrationStatic illustration={illustration} className={style.pictogram} />
            <div className={style.header}>
                <ContactPageHeader
                    contentProps={{
                        data: {
                            title,
                            illustration,
                        },
                    }}
                    textAboveTitle={textAboveTitle}
                />
            </div>
            <div className={style.content}>
                <ParsedHtml htmlProps={html} />
            </div>
        </div>
    );
};
