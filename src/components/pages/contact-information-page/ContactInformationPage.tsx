import React from 'react';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { CallOption } from 'components/_common/contact-option/CallOption';

import { classNames, BEM } from 'utils/classnames';

import './ContactInformationPage.less';

const bem = BEM('contactInformationPage');

export const ContactInformationPage = (props: any) => {
    const { data } = props;
    const { contactType } = data;

    if (!props.editorView) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return (
        <div className={classNames(bem(), bem('preview-wrapper'))}>
            <CallOption {...contactType.telephone} />
        </div>
    );
};
