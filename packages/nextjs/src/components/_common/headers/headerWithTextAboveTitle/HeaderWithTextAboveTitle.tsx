import { BodyShort, Heading } from '@navikt/ds-react';
// import { PictogramsProps } from 'types/content-props/pictograms';
// import { Illustration } from 'components/_common/illustration/Illustration';
// import style from 'components/_common/headers/generalPageHeader/GeneralPageHeader.module.scss';

type Props = {
    title: string;
    textAboveTitle?: string;
    // illustration: PictogramsProps;
};

export const HeaderWithTextAboveTitle = ({ title, textAboveTitle }: Props) => {
    return (
        <div>
            {/*<Illustration illustration={illustration} className={style.illustration} />*/}
            <BodyShort>{textAboveTitle}</BodyShort>
            <Heading level="1" size="xlarge">
                {title}
            </Heading>
        </div>
    );
};
