import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';
import { HeaderTypoStyle } from '../typo-style';
import { AnimatedIconsProps } from '../content-props/animated-icons';
import { Taxonomy } from 'types/taxonomies';
import { AuthStateType } from 'store/slices/authState';
import { EmptyObject, OptionSetMulti, OptionSetSingle } from '../util-types';
import { Area } from 'types/areas';
import { ProductDetailType } from 'types/content-props/product-details';
import { SituationPageProps } from 'types/content-props/dynamic-page-props';

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
    MUNICIPALITY = 'municipality_employed',
    OPTICIAN = 'optician',
    ADMINISTRATOR = 'administrator',
    MEASURES_ORGANIZER = 'measures_organizer',
    AID_SUPPLIER = 'aid_supplier',
    OTHER = 'other',
}

export type AudienceProps = OptionSetSingle<{
    [Audience.PERSON]: EmptyObject;
    [Audience.EMPLOYER]: EmptyObject;
    [Audience.PROVIDER]: { provider_audience?: ProviderAudience[] };
}>;

export const getAudience = (
    audience?: AudienceProps | Audience | Audience[]
) => {
    if (!audience) {
        return null;
    }

    if (typeof audience === 'string') {
        return audience;
    }

    // Always prioritize person audience if it is present
    if (Array.isArray(audience)) {
        return audience.includes(Audience.PERSON)
            ? Audience.PERSON
            : audience[0];
    }

    return audience._selected;
};
export const getSubAudience = (
    audience?: AudienceProps | Audience | Audience[]
): ProviderAudience[] | null => {
    if (!audience || typeof audience === 'string' || Array.isArray(audience)) {
        return null;
    }

    if (audience._selected === Audience.PROVIDER) {
        return audience[Audience.PROVIDER].provider_audience || [];
    }

    return null;
};

export type FilterSelection = string[];

export type AlternativeAudience = OptionSetMulti<{
    person: { targetPage: ContentProps };
    employer: { targetPage: ContentProps };
    provider: {
        providerList: {
            providerAudience: ProviderAudience[];
            targetPage: ContentProps;
        }[];
    };
}>;

export type ProductDataMixin = {
    title: string;
    ingress?: string;
    taxonomy: Taxonomy[];
    audience?: Audience;
    customCategory?: string;
    illustration: AnimatedIconsProps;
    area: Area[];
    externalProductUrl?: string;
    alternativeAudience?: AlternativeAudience;
    relatedSituations?: SituationPageProps[];
};

export type ProductDetailsDataMixin = {
    detailType?: ProductDetailType;
    overviewType?: ProductDetailType;
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
    target: Pick<ContentProps, '_path' | 'displayName'> & Partial<ContentProps>;
    anchorId?: string;
    text?: string;
};

export type ExternalLinkMixin = {
    url: string;
    text: string;
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
            typo: HeaderTypoStyle;
        };
    }>;
};
