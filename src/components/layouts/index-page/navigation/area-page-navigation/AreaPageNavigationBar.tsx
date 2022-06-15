import React from 'react';
import { classNames } from '../../../../../utils/classnames';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';

import style from './AreaPageNavigationBar.module.scss';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
    navigationCallback: (path: string) => void;
};

export const AreaPageNavigationBar = ({
    isVisible,
    areasRefs,
    navigationCallback,
}: Props) => {
    return (
        <div
            className={classNames(
                style.areasPageNavigation,
                !isVisible && style.hidden
            )}
        >
            <LenkeInline
                href={'/forside'}
                onClick={(e) => {
                    e.preventDefault();
                    navigationCallback('/forside');
                }}
                className={style.areasPageNavigationLink}
            >
                {'Til forside'}
            </LenkeInline>
            {isVisible &&
                areasRefs.map((ref) => (
                    <LenkeInline
                        href={ref.data.customPath || ref._path}
                        onClick={(e) => {
                            e.preventDefault();
                            navigationCallback(
                                ref.data.customPath || ref._path
                            );
                        }}
                        className={style.areasPageNavigationLink}
                        key={ref._id}
                    >
                        {ref.data.header}
                    </LenkeInline>
                ))}
        </div>
    );
};
