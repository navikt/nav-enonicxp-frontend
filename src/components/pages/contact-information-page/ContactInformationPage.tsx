import React from 'react';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { BEM } from '../../../utils/classnames';
import './ContactInformationPage.less';

const bem = BEM('contact-information-page');

export const ContactInformationPage = (props: any) => {
    const { data } = props;

    if (!props.editorView) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return <div>contact</div>;
};
