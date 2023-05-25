import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps, ContentType } from '../content-props/_content-common';
import { TypoStyle } from '../typo-style';
import { AnimatedIconsProps } from '../content-props/animated-icons';
import { ProductTaxonomy, Taxonomy } from 'types/taxonomies';
import { AuthStateType } from 'store/slices/authState';
import { EmptyObject, OptionSetSingle } from '../util-types';
import { Area } from 'types/areas';
import { ProductDetailType } from 'types/content-props/product-details';

export type HeaderWithAnchorMixin = {
    title: string;
    anchorId: string;
    toggleCopyButton: boolean;
};


export enum Audience {
    PERSON = 'person',
    EMPLOYER = 'employer',
    PROVIDER = 'provider',
}

export enum ProviderAudience {
    DOCTOR = 'doctor',
    DENTIST = 'dentist',
    OPTICIAN = 'optician',
    OCCUPATIONAL_THERAPIST = 'occupational_therapist',
    AID_SUPPLIER = 'aid_supplier',
    MEASURES_ORGANIZER = 'measures_organizer',
    ADMINISTRATOR = 'administrator',
    MUNICIPALITY = 'municipality',
    OTHER = 'other',
}

export type AudienceProps = {
    _selected: Audience;
    provider_audience?: ProviderAudience;
};
export const getAudience = (audience: AudienceProps | Audience) => {
    if (audience && typeof audience !== 'string' && audience._selected) {
        return audience._selected;
    }
    return typeof audience === 'string' ? audience : Audience.PERSON;
};

export type FilterSelection = string[];

export type SimplifiedProductData = {
    _id: string;
    type: ContentType;
    productDetailsPath: string;
    path: string;
    sortTitle: string;
    anchorId: string;
    taxonomy: ProductTaxonomy[];
} & Omit<ProductDataMixin, 'taxonomy'>;

export type ProductDataMixin = {
    title: string;
    ingress?: string;
    taxonomy: Taxonomy[];
    audience?: Audience;
    customCategory?: string;
    illustration: AnimatedIconsProps;
    area: Area[];
    externalProductUrl?: string;
};

export type ProductDetailsDataMixin = {
    detailType: ProductDetailType;
    pageUsageReference?: string;
};

export type LinkSelectable = OptionSetSingle<{
    internal: InternalLinkMixin;
    external: ExternalLinkMixin;
}>;

export type ContentListMixin = {
    target: ContentListProps;
};

export type InternalLinkMixin = {
    target: Pick<ContentProps, '_path'> & Partial<ContentProps>;
    anchorId?: string;
    text?: string;
};

export type ExternalLinkMixin = {
    url: string;
    text?: string;
};

export type LinkWithIngressMixin = {
    ingress?: string;
    link: LinkSelectable;
};

export type ExpandableMixin = {
    expandable: boolean;
    expandableTitle: string;
    expandableAnchorId?: string;
    analyticsOriginTag?: string;
};

export type FiltersMixin = {
    filters: string[];
};

export type ColorMixin = {
    color: string;
};

export type RenderOnAuthStateMixin = {
    renderOnAuthState?: AuthStateType;
};

export type LayoutCommonConfigMixin = Partial<
    {
        marginTop: number;
        marginBottom: number;
        bgColor: ColorMixin;
        paddingSides: OptionSetSingle<{
            fullWidth: EmptyObject;
            standard: EmptyObject;
            custom: {
                remValue: number;
            };
        }>;
        paddingTopBottom: OptionSetSingle<{
            standard: EmptyObject;
            custom: {
                top: number;
                bottom: number;
            };
        }>;
    } & RenderOnAuthStateMixin
>;

export type HeaderCommonConfig = {
    justify: 'left' | 'center' | 'right';
    typo: OptionSetSingle<{
        default: EmptyObject;
        custom: {
            typo: TypoStyle;
        };
    }>;
};
