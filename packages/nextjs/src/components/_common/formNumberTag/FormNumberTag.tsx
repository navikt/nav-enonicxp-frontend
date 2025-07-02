import { Tag } from '@navikt/ds-react';

interface Props {
    formNumber: string;
    className?: string;
    selected?: boolean;
}

export const FormNumberTag = ({ formNumber, className, selected }: Props) => {
    return (
        <Tag
            size="small"
            variant={selected ? 'info-moderate' : 'neutral-moderate'}
            className={className}
        >
            {formNumber}
        </Tag>
    );
};
