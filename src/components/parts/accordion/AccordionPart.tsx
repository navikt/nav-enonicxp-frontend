import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartPropsAccordion } from '../../../types/component-props/part-configs/accordion';

export const AccordionPart = ({ config }: PartPropsAccordion) => {
    if (!config || !config.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} />;
};
