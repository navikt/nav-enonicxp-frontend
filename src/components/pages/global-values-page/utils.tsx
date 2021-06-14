import React from 'react';
import { GlobalValueItem } from '../../../types/content-props/global-values-props';
import { GVMessageProps } from './components/messages/GVMessages';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';

export const gvNameExists = (
    itemName: string,
    items: GlobalValueItem[],
    key?: string
) =>
    items.find(
        (item) => item.itemName === itemName && (!key || item.key !== key)
    );

export const generateGvUsageMessages = (usage, itemName) => {
    if (!usage) {
        return [
            {
                message: 'Teknisk feil - kunne ikke hente bruk av verdier',
                level: 'error',
            },
            {
                message:
                    'Prøv igjen, eller kontakt #team-personbruker dersom problemet vedvarer',
                level: 'info',
            },
        ];
    }

    if (usage.length === 0) {
        return [
            {
                message: `Verdien "${itemName}" er ikke i bruk`,
                level: 'info',
            },
        ];
    }

    const contentUseMsgs = usage.map(
        (content): GVMessageProps => ({
            message: (
                <>
                    <LenkeStandalone
                        href={content.path.replace('/www.nav.no', '')}
                        target={'_blank'}
                        withChevron={false}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {content.displayName}
                    </LenkeStandalone>
                    {' // '}
                    <LenkeStandalone
                        href={`/admin/tool/com.enonic.app.contentstudio/main#/default/edit/${content.id}`}
                        target={'_blank'}
                        withChevron={false}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {'[Åpne i editor]'}
                    </LenkeStandalone>
                </>
            ),
            level: 'info',
        })
    );

    return [
        {
            message: `Verdien "${itemName}" er i bruk på følgende sider:`,
            level: 'warning',
        },
        ...contentUseMsgs,
    ];
};
