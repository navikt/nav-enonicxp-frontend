import React, { Fragment } from 'react';
import { MacroLenkeFilerProps } from 'types/macro-props/lenkeFiler';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';

export const MacroLenkeFiler = ({ config }: MacroLenkeFilerProps) => {
    if (!config?.lenkeFiler) {
        return null;
    }

    const { text, files } = config.lenkeFiler;

    return (
        <>
            {text}
            {files.map((file) => {
                const filePath = file?._path;
                if (!filePath) {
                    return null;
                }

                const fileExt = filePath.split('.').slice(-1);
                return (
                    <Fragment key={filePath}>
                        {' '}
                        <LenkeInline
                            href={filePath}
                            aria-label={`${text} ${fileExt}`}
                        >{`[${fileExt}]`}</LenkeInline>
                    </Fragment>
                );
            })}
        </>
    );
};
