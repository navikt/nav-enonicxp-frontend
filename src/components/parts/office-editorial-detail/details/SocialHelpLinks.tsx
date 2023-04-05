import classNames from 'classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { forceArray } from 'utils/arrays';
import { DetailProps } from '../OfficeEditorialDetail';

/* eslint-disable-next-line */
import styles from './SocialHelpLinks.module.scss';

export const SocialHelpLinks = ({ officeData }: DetailProps) => {
    const socialHelpLinks = forceArray(
        officeData.brukerkontakt?.sosialhjelp?.digitaleSoeknader
    );

    if (!socialHelpLinks || socialHelpLinks.length === 0) {
        return null;
    }

    return (
        <div>
            {socialHelpLinks.map((link) => (
                <LenkeBase
                    key={link.lenke}
                    href={link.lenke}
                    className={classNames(styles.singleLink)}
                >
                    {link.lenketekst}
                </LenkeBase>
            ))}
        </div>
    );
};
