import classNames from 'classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { DetailProps } from '../OfficeEditorialDetail';

import styles from './Details.module.scss';

export const SocialHelpLinks = ({ officeData }: DetailProps) => {
    const socialHelpLinks =
        officeData.brukerkontakt.sosialhjelp.digitaleSoeknader;
    return (
        <div>
            {socialHelpLinks.map((link) => (
                <LenkeBase
                    key={link.lenke}
                    href={link.lenke}
                    className={classNames(styles.anchor, styles.socialHelpLink)}
                >
                    {link.lenketekst}
                </LenkeBase>
            ))}
        </div>
    );
};
