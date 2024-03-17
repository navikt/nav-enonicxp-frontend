import { Accordion } from 'components/_common/accordion/Accordion';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const AccordionPart = ({
    config,
}: PartComponentProps<PartType.Accordion>) => {
    if (!config?.accordion || config.accordion.length === 0) {
        return <EditorHelp text={'Kortet mangler innhold'} />;
    }

    const { accordion } = config;

    return <Accordion accordion={accordion} />;
};
