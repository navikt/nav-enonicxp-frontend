import React from 'react';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';
import { adminOrigin, editorPathPrefix, xpDraftPathPrefix } from 'utils/urls';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import { UsageContentInfo } from 'components/pages/global-values-page/api/services/usage';
import { GVMessageProps } from './components/messages/GVMessages';

export const gvNameExists = (itemName: string, items: GlobalValueItem[], key?: string) =>
    items.find((item) => item.itemName === itemName && (!key || item.key !== key));

const getUsageMessages = (usage: UsageContentInfo[]) => {
    if (!usage || usage.length === 0) {
        return [];
    }

    return usage.map(
        (content): GVMessageProps => ({
            message: (
                <>
                    <EditorLinkWrapper>
                        <LenkeStandalone
                            href={content.path.replace('/www.nav.no', xpDraftPathPrefix)}
                            target={'_blank'}
                            withChevron
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {content.displayName}
                        </LenkeStandalone>
                    </EditorLinkWrapper>
                    {' // '}
                    <EditorLinkWrapper>
                        <LenkeStandalone
                            href={`${adminOrigin}${editorPathPrefix}/${content.id}`}
                            target={'_blank'}
                            withChevron
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {'[Åpne i editor]'}
                        </LenkeStandalone>
                    </EditorLinkWrapper>
                </>
            ),
            level: 'info',
        })
    );
};

export const generateGvUsageMessages = (
    usage: UsageContentInfo[],
    itemName: string
): GVMessageProps[] => {
    if (!usage) {
        return [
            {
                message: 'Teknisk feil - kunne ikke hente bruk av verdier',
                level: 'error',
            },
            {
                message: 'Prøv igjen, eller kontakt #team-personbruker dersom problemet vedvarer',
                level: 'info',
            },
        ];
    }

    const usageMessages = getUsageMessages(usage);

    if (usageMessages.length === 0) {
        return [
            {
                message: `Verdien "${itemName}" er ikke i bruk`,
                level: 'info',
            },
        ];
    }

    return [
        {
            message: `Verdien "${itemName}" er i bruk på følgende sider:`,
            level: 'info',
        },
        ...usageMessages,
    ];
};
