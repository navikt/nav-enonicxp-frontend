import { ExpandableMixin } from '../../../types/component-props/_mixins';
import { Accordion } from '@navikt/ds-react';
import { logAmplitudeEvent } from '../../../utils/amplitude';
import style from './Expandable.module.scss';

type Props = {
    children: React.ReactNode;
} & ExpandableMixin;

export const Expandable = ({
    expandable,
    expandableTitle,
    expandableAnchorId,
    analyticsOriginTag = '',
    children,
}: Props) => {

    if (!expandable) {
        return <>{children}</>;
    }

    const onExpandCollapse = () => {
        logAmplitudeEvent(`panel-${'kollaps'}`, {
            tittel: expandableTitle,
            opprinnelse: analyticsOriginTag,
        });
    };

    return (
        <Accordion id={expandableAnchorId}>
            <Accordion.Item
                renderContentWhenClosed={true}
                className={style.expandable}
            >
                <Accordion.Header onClick={onExpandCollapse}>
                    {expandableTitle}
                </Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};
