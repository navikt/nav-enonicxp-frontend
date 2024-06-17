const appOrigin = process.env.APP_ORIGIN;

import style from './Icon.module.scss';

type IconProps = {
    type: string;
    altText?: string;
};

export const Icon = ({ type, altText }: IconProps) => {
    return (
        <div className={style.icon}>
            <img
                className={type === 'message' ? style.writeIcon : ''}
                alt={altText ?? ''}
                src={`${appOrigin}/gfx/${type}.svg`}
            />
        </div>
    );
};
