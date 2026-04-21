const appOrigin = process.env.APP_ORIGIN;

import { ArrowRightIcon } from '@navikt/aksel-icons';
import style from './Icon.module.scss';

type IconProps = {
    type: string;
    altText?: string;
};

export const Icon = ({ type, altText }: IconProps) => {
    return (
        <div className={style.icon}>
            {type === 'generisk' ? (
                <ArrowRightIcon aria-hidden fontSize="1.5rem" color="var(--default-action-color)" />
            ) : (
                <img
                    className={type === 'message' ? style.writeIcon : ''}
                    alt={altText ?? ''}
                    src={`${appOrigin}/gfx/${type}.svg`}
                />
            )}
        </div>
    );
};
