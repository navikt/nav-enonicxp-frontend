import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { AccordionPartProps } from 'types/component-props/parts/accordion';

export const AccordionPart = ({ config }: AccordionPartProps) => {
    if (!config || !config.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler konfigurasjon'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} />;
};