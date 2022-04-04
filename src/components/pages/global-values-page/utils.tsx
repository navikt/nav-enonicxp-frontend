import React from 'react';
import { GlobalValueItem } from '../../../types/content-props/global-values-props';
import { GVMessageProps } from './components/messages/GVMessages';
import { LenkeStandalone } from '../../_common/lenke/LenkeStandalone';
import { editorPathPrefix } from '../../../utils/urls';
import { EditorLinkWrapper } from '../../_editor-only/editor-link-wrapper/EditorLinkWrapper';

export const gvNameExists = (
    itemName: string,
    items: GlobalValueItem[],
    key?: string
) =>
    items.find(
        (item) => item.itemName === itemName && (!key || item.key !== key)
    );

const getUsageMessages = (usage) => {
    if (!usage || usage.length === 0) {
        return [];
    }

    return usage.map(
        (content): GVMessageProps => ({
            message: (
                <>
                    <EditorLinkWrapper>
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
                    </EditorLinkWrapper>
                    {' // '}
                    <EditorLinkWrapper>
                        <LenkeStandalone
                            href={`${editorPathPrefix}/${content.id}`}
                            target={'_blank'}
                            withChevron={false}
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

export const generateGvUsageMessages = (usage, itemName): GVMessageProps[] => {
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
        usageMessages.length > 0 && {
            message: `Verdien "${itemName}" er i bruk på følgende sider:`,
            level: 'info',
        },
        ...usageMessages,
    ];
};
