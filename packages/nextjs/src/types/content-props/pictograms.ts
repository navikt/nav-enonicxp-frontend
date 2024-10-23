import { XpImageProps } from 'types/media';
import { ContentType } from './_content-common';

export type Icon = {
    icon?: XpImageProps;
};

type PictogramsData = {
    icons: Icon[];
};

export interface PictogramsProps {
    type: ContentType.Pictograms;
    data: PictogramsData;
}
