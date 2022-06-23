import { LinkProps } from 'types/link-props';
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

import { classNames } from 'utils/classnames';

import style from './ShortcutCard.module.scss';
import { IllustrationAnimated } from '../illustration/IllustrationAnimated';
import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import {
    AnimatedIconsData,
    AnimatedIconsProps,
} from 'types/content-props/animated-icons';
import { ContentType } from 'types/content-props/_content-common';

export type ShortcutCardProps = {
    link: LinkProps;
    className?: string;
};

export const ShortcutCard = (props: ShortcutCardProps) => {
    const { link, className } = props;
    const { text } = link;
    const { isHovering, cardInteractionHandler } = useCardState();

    const illustration: AnimatedIconsProps = {
        __typename: ContentType.AnimatedIcons,
        data: {
            icons: [],
            lottieHover: {
                mediaText:
                    '{"v":"4.8.0","meta":{"g":"LottieFiles AE 1.0.0","a":"","k":"","d":"","tc":"#FFFFFF"},"fr":25,"ip":0,"op":10,"w":96,"h":96,"nm":"neutral","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 2 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[51,45.5,0],"to":[4.485,0,0],"ti":[-4.485,0,0]},{"t":8,"s":[77.912,45.5,0]}],"ix":2},"a":{"a":0,"k":[19,27.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],"v":[[16,0],[-7.579,24.5],[-16,16.052],[-0.842,0],[-16,-16.052],[-7.579,-24.5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.149019607843,0.149019607843,0.149019607843,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[19,27.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":10,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Layer 3 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[48,46,0],"ix":2},"a":{"a":0,"k":[40.25,40.25,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.221,"y":0},"t":0,"s":[{"i":[[-22.091,0],[0,-22.091],[22.091,0],[0,22.091]],"o":[[22.091,0],[0,22.091],[-22.091,0],[0,-22.091]],"v":[[0,-40],[40,0],[0,40],[-40,0]],"c":true}]},{"t":8,"s":[{"i":[[-0.201,-0.176],[-0.837,-0.611],[0.402,-0.042],[-0.167,-0.41]],"o":[[0.402,0.025],[0.167,-0.008],[0.201,-0.042],[0.033,-0.41]],"v":[[-14.662,-25.407],[25.338,14.593],[18.971,20.912],[-21.029,-19.088]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.800000011921,0.882352948189,0.941176474094,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.2,"y":0},"t":0,"s":[40.25,40.25],"to":[0.524,1.812],"ti":[-0.524,-1.812]},{"t":8,"s":[43.396,51.123]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":1,"k":[{"i":{"x":[0.25],"y":[1]},"o":{"x":[0.176],"y":[0]},"t":0,"s":[0]},{"t":8,"s":[-45]}],"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-14,-5],[14,-5],[14,5],[-14,5]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.800000011921,0.882352948189,0.941176474094,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[42.25,58.25],"to":[-1.658,0.705],"ti":[1.658,-0.705]},{"t":8,"s":[32.3,62.483]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.33,0.33],"y":[0,0]},"t":0,"s":[100,100]},{"t":8,"s":[160,75]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-17.5,-3],[17.5,-3],[17.5,3],[-17.5,3]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.800000011921,0.882352948189,0.941176474094,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[38.75,20.25],"to":[-2.346,0.191],"ti":[2.346,-0.191]},{"t":8,"s":[24.676,21.398]}],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.25,0.25],"y":[1,1]},"o":{"x":[0.33,0.33],"y":[0,0]},"t":0,"s":[100,100]},{"t":8,"s":[117,106]}],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":10,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Layer 4 Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[42,46,0],"ix":2},"a":{"a":0,"k":[28.5,1.5,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[46.843,-11.73],[15.843,-11.73]],"c":false}]},{"t":8,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[33.789,-11.63],[2.789,-11.63]],"c":false}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.149019607843,0.149019607843,0.149019607843,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[66.345,1.508],[12.345,1.508]],"c":false}]},{"t":8,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[51.885,1.508],[10.538,1.508]],"c":false}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.149019607843,0.149019607843,0.149019607843,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.25,"y":1},"o":{"x":0.33,"y":0},"t":0,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[52.764,13.55],[24.764,13.55]],"c":false}]},{"t":8,"s":[{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[28.262,16.362],[0.262,16.362]],"c":false}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[0.149019607843,0.149019607843,0.149019607843,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":3,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 3","np":2,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":10,"st":0,"bm":0}],"markers":[]}',
            },
        },
    };

    return (
        <Card
            link={link}
            type={CardType.ShortcutCard}
            size={CardSize.Mini}
            className={classNames(style.shortcutCard, className)}
            interactionHandler={(type: Interaction) =>
                cardInteractionHandler(type)
            }
        >
            <>
                <IllustrationAnimated
                    isHovering={isHovering}
                    illustration={illustration}
                    className={style.illustration}
                />
                <BodyLong className={style.title}>{text}</BodyLong>
            </>
        </Card>
    );
};
