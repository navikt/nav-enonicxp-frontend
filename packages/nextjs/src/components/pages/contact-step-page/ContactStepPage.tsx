import { ContentType, ContentCommonProps } from 'types/content-props/_content-common';
import { PictogramsProps } from 'types/content-props/pictograms';
import { FormIntermediateStepLink } from 'components/_common/formIntermediateStepLink/FormIntermediateStepLink';
import { InternalLinkMixin } from 'types/component-props/_mixins';
import { MellomstegLayout } from 'components/layouts/mellomsteg/MellomstegLayout';

export type ContactStepPageProps = Pick<ContentCommonProps, '_path'> & {
    type: ContentType.ContactStepPage;
    data: {
        title: string;
        illustration: PictogramsProps;
        textAboveTitle?: string;
        html?: string;
        linkPanels: (InternalLinkMixin & { ingress?: string })[];
        backLink: InternalLinkMixin;
        formNumbers?: string[];
    };
};

export const ContactStepPage = ({ data }: ContactStepPageProps) => {
    const { linkPanels, backLink } = data;

    return (
        <MellomstegLayout
            data={data}
            listItems={linkPanels.map((linkPanel, index) => {
                const linkPaneltitle = linkPanel.text ?? linkPanel.target.displayName;
                return (
                    <li key={index}>
                        <FormIntermediateStepLink
                            label={linkPaneltitle}
                            explanation={linkPanel.ingress ?? ''}
                            href={linkPanel.target._path}
                            analyticsComponent={'ContactStepPage'}
                            analyticsLabel={linkPaneltitle}
                        />
                    </li>
                );
            })}
            analyticsComponent={'ContactStepPage'}
            backLink={{
                target: {
                    _path: backLink.target._path,
                    displayName: backLink.text ?? backLink.target.displayName,
                },
            }}
        />
    );
};
