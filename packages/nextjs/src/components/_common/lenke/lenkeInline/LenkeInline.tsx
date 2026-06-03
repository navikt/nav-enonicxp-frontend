import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

type Props = React.ComponentProps<typeof LenkeBase>;

export const LenkeInline = ({ className, children, ...rest }: Props) => (
    <LenkeBase className={classNames('aksel-link aksel-link--inline-text', className)} {...rest}>
        {children}
    </LenkeBase>
);
