import React from 'react';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { BEM } from '../../../utils/classnames';
import './ContactInformationPage.less';
import { CallOption } from 'components/_common/contact-option/CallOption';

const bem = BEM('contact-information-page');

export const ContactInformationPage = (props: any) => {
    const { data } = props;

    console.log(data);

    if (!props.editorView) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return <CallOption {...data} />;
};
