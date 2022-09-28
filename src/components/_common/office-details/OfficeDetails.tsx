import classNames from 'classnames';
import { OfficeEditorialPageData } from 'types/content-props/dynamic-page-props';
import styles from './OfficeDetails.module.scss';

type OfficeDetailsProps = {
    officeData: OfficeEditorialPageData;
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
