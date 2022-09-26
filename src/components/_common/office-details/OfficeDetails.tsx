import classNames from 'classnames';
import { OfficeInformationData } from 'types/content-props/office-information-props';
import styles from './OfficeDetails.module.scss';

type OfficeDetailsProps = {
    officeData: OfficeInformationData;
};

export const OfficeDetails = ({ officeData }: OfficeDetailsProps) => {
    console.log(officeData);
    return (
        <div className={styles.wide}>
            <div className="content">
                <div
                    className={classNames(
                        styles.officeDetails,
                        'region__pageContent'
                    )}
                >
                    <div className={styles.addressPoster}>
                        [Adresse og åpningstider]
                    </div>
                    <div className={styles.phonePoster}>
                        [Informasjon om telefonnummer]
                    </div>
                </div>
            </div>
        </div>
    );
};
