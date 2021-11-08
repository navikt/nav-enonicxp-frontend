import { ContactData } from '../../../types/component-props/parts/contact-option';

import { translator } from 'translations';
import { Title, BodyLong, Accordion, BodyShort } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import { BEM, classNames } from 'utils/classnames';

import './DefaultOption.less';
import { formatDate } from 'utils/datetime';

const bem = BEM('contactOption');

export const CallOption = (props: ContactData) => {
    const {
        title,
        text,
        phoneNumber,
        channel,
        regularOpeningHours,
        specialOpeningHours,
    } = props;
    const { language } = usePageConfig();

    const getDateTimeTranslations = translator('dateTime', language);
    const weekDayNames = getDateTimeTranslations('weekDayNames');

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const getWeekDayName = (day: number) => {
        return weekDayNames[day];
    };

    return (
        <div className={classNames(bem(), bem('preview-wrapper'))}>
            <LenkeBase
                className={classNames(bem())}
                href={`tel:+47${phoneNumber?.replace(/\s/g, '')}`}
            >
                <div
                    className={classNames(bem('icon'), bem('icon', channel))}
                />
                <Title level={2} size="m" className={bem('title')}>
                    {title}
                </Title>
            </LenkeBase>
            <BodyLong className={bem('text')} spacing>
                {text}
            </BodyLong>
            <Title level={2} size="s" spacing>
                {specialOpeningHours
                    ? sharedTranslations['generalOpeningHours']
                    : sharedTranslations['openingHours']}
            </Title>
            {regularOpeningHours && (
                <Accordion heading={<BodyShort>SOmething åpent nå</BodyShort>}>
                    {Object.entries(regularOpeningHours).map((hour, index) => (
                        <div key={index}>{getWeekDayName(index)}</div>
                    ))}
                </Accordion>
            )}
            {specialOpeningHours && (
                <>
                    <Title level={2} size="s" spacing>
                        {specialOpeningHours.title}
                    </Title>
                    <BodyLong spacing>{specialOpeningHours.text}</BodyLong>
                    <table>
                        <tbody>
                            {specialOpeningHours.hours.map((openingHour) => (
                                <tr>
                                    <td>
                                        {formatDate(openingHour.date, 'no')}
                                    </td>
                                    <td>
                                        {openingHour.status === 'OPEN'
                                            ? `${openingHour.from} - ${openingHour.to}`
                                            : sharedTranslations['closed']}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <BodyLong spacing>{specialOpeningHours.footNote}</BodyLong>
                </>
            )}
        </div>
    );
};
