import React from 'react';
import { BEM } from 'utils/bem';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import './PageList.less';

const PageList = (props: ContentProps) => {
    const bem = BEM('page-list');
    const sectionContents = (props.data?.sectionContents || []).filter(
        (section) => props._id !== section._id
    );

    return (
        <div className={bem()}>
            <Innholdstittel>{props.displayName}</Innholdstittel>
            <div className={bem('ingress')}>
                <Normaltekst>{props.data.ingress}</Normaltekst>
            </div>
            <div className={bem('list')}>
                {sectionContents.map((section) => {
                    const { displayName, _path } = section;
                    const ingress =
                        section.data?.ingress || section.data?.description;
                    return (
                        <div key={section._path} className={bem('row')}>
                            <Normaltekst>
                                <LenkeInline href={_path}>
                                    {displayName}
                                </LenkeInline>
                            </Normaltekst>
                            {ingress && (
                                <div className={bem('ingress')}>
                                    <Normaltekst>{ingress}</Normaltekst>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PageList;
