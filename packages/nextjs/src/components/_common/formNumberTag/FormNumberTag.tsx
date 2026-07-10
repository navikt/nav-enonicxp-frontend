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
            variant={selected ? 'strong' : 'moderate'}
            data-color={selected ? 'info' : 'neutral'}
            className={className}
        >
            {formNumber}
        </Tag>
    );
};
