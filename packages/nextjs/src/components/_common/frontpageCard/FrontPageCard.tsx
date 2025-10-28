import { LinkCard } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { classNames } from 'utils/classnames';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { useCard } from 'components/_common/card/useCard';

import styles from './FrontPageCard.module.scss';

type Props = {
    illustration?: PictogramsProps;
    path: string;
    title: string;
    type: CardType;
    tryFallbackIllustration?: boolean;
};

export const FrontPageCard = ({
    illustration,
    path,
    title,
    type,
    tryFallbackIllustration,
}: Props) => {
    const link: LinkProps = {
        url: path,
        text: title,
    };

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <LinkCard
            className={classNames(styles.frontpageCard, styles.miniCardV1, type)}
            {...userEventProps}
        >
            {illustration && (
                <LinkCard.Icon>
                    <Illustration
                        className={styles.illustration}
                        illustration={illustration}
                        tryFallbackIllustration={tryFallbackIllustration}
                    />
                </LinkCard.Icon>
            )}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase href={link.url} {...analyticsProps}>
                        {link.text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
        </LinkCard>
    );
};
