import React, { useState } from 'react';
import { Button } from '../../button/Button';
import { appOrigin, xpContentPathPrefix } from '../../../../utils/urls';
import { BEM, classNames } from '../../../../utils/classnames';
import { useRouter } from 'next/router';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { LenkeStandalone } from '../../lenke/LenkeStandalone';
import NavFrontendChevron from 'nav-frontend-chevron';
import './VersionPicker.less';

const bem = BEM('version-picker');

type Props = {
    content: ContentProps;
};

export const VersionPicker = ({ content }: Props) => {
    const [versionDate, setVersionDate] = useState<string | undefined>();
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    if (process.env.ENV === 'prod' && !content.editMode) {
        return null;
    }

    const path = content._path.split(xpContentPathPrefix)[1];
    const today = new Date().toISOString().slice(0, 10);

    return (
        <div className={bem()}>
            {versionDate && <div>{`Viser innhold fra ${versionDate}`}</div>}
            <LenkeStandalone
                withChevron={false}
                href={'#'}
                onClick={() => setIsOpen(!isOpen)}
                className={bem('toggle')}
            >
                {'Velg historisk innhold'}
                <NavFrontendChevron
                    type={isOpen ? 'opp' : 'ned'}
                    className={bem('toggle-chevron')}
                />
            </LenkeStandalone>
            <div className={bem('selector-wrapper')}>
                <div
                    className={classNames(
                        bem('selector'),
                        isOpen && bem('selector', 'open')
                    )}
                >
                    <input
                        type={'date'}
                        className={bem('date')}
                        onInput={(e: any) => {
                            setVersionDate(e.target.value);
                        }}
                        min={'2019-12-01'}
                        max={today}
                    />
                    <Button
                        kompakt={true}
                        mini={true}
                        className={bem('version-picker-button')}
                        onClick={() => {
                            if (versionDate) {
                                router.push(
                                    `${appOrigin}/version${path}?time=${versionDate}&id=${content._id}`
                                );
                                setIsOpen(false);
                            }
                        }}
                    >
                        {'Hent side fra denne datoen'}
                    </Button>
                </div>
            </div>
        </div>
    );
};
