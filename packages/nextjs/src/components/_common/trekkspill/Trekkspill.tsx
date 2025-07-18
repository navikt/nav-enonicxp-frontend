import React, { useRef, useState } from 'react';
import { Accordion as DSAccordion } from '@navikt/ds-react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { Shortcuts, useShortcuts } from 'utils/useShortcuts';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartConfigTrekkspill } from 'components/parts/trekkspill/TrekkspillPart';
import { classNames } from 'utils/classnames';
import { handleStickyScrollOffset } from 'utils/scroll-to';
import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import { useCheckAndOpenTrekkspillPanel } from 'store/hooks/useCheckAndOpenTrekkspillPanel';
import styles from './Trekkspill.module.scss';

type TrekkspillRef = PartConfigTrekkspill;
type PanelItem = TrekkspillRef['accordion'][number];

export const Trekkspill = ({ accordion }: TrekkspillRef) => {
    const itemRefs = useRef(accordion.map(() => React.createRef<HTMLDivElement>()));
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { editorView, type } = contentProps;
    const [openTrekkspill, setOpenTrekkspill] = useState<number[]>([]);

    const expandAll = () => setOpenTrekkspill(accordion.map((_, index) => index));
    const validatePanel = (item: PanelItem) => Boolean(item.title && item.html);

    useShortcuts({ shortcut: Shortcuts.SEARCH, callback: expandAll });

    const handleOpenChange = (isOpening: boolean, tittel: string, index: number) => {
        handleStickyScrollOffset(isOpening, itemRefs.current[index].current);
        setOpenTrekkspill((prev) =>
            isOpening ? [...prev, index] : prev.filter((i) => i !== index)
        );
        logAnalyticsEvent(isOpening ? AnalyticsEvents.ACC_EXPAND : AnalyticsEvents.ACC_COLLAPSE, {
            tittel,
            opprinnelse: 'trekkspill',
            komponent: 'Accordion',
            målgruppe: context,
            innholdstype: innholdsTypeMap[type],
        });
    };

    if (itemRefs.current.length !== accordion.length) {
        itemRefs.current = accordion.map(() => React.createRef<HTMLDivElement>());
    }

    useCheckAndOpenTrekkspillPanel(openTrekkspill, setOpenTrekkspill, itemRefs.current, expandAll);

    // Show all panels in edit mode, but only valid panels in view mode
    const validTrekkspill = accordion.filter(validatePanel);
    const relevantTrekkspill = editorView === 'edit' ? accordion : validTrekkspill;

    return (
        <DSAccordion className={styles.trekkspill}>
            {relevantTrekkspill.map((item, index) => {
                const isValid = validatePanel(item);
                return (
                    <DSAccordion.Item
                        key={index}
                        className={styles.item}
                        open={openTrekkspill.includes(index)}
                        onOpenChange={(open) => handleOpenChange(open, item.title, index)}
                        ref={itemRefs.current[index]}
                        tabIndex={-1}
                    >
                        <DSAccordion.Header className={styles.header} id={item.anchorId}>
                            {!isValid ? (
                                <EditorHelp text="Panelet mangler tittel eller innhold. Klikk for å redigere" />
                            ) : (
                                <div className={styles.headerTitle}>{item.title}</div>
                            )}
                        </DSAccordion.Header>
                        <DSAccordion.Content className={styles.content}>
                            <div className={classNames(defaultHtml.html, 'parsedHtml')}>
                                <ParsedHtml htmlProps={item.html} />
                            </div>
                        </DSAccordion.Content>
                    </DSAccordion.Item>
                );
            })}
        </DSAccordion>
    );
};
