import React from 'react';
import { useEffect, useState } from 'react';
import { BodyLong } from '@navikt/ds-react';
import Cookie from 'js-cookie';
import { classNames } from 'utils/classnames';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { SurpriseDecoration } from './SurpriseDecoration';

import style from './SurpriseFrida.module.scss';

type Props = {
    animate: boolean;
    stop: () => void;
};

const messages: Array<{ time: number; text: string }> = [
    {
        text: 'Hei, Olav Rusten! Hva kan jeg hjelpe deg med på den siste dagen på jobb for NAV, HC, kongen og fedrelandet?',
        time: 8000,
    },
    {
        text: 'Har du fått ordnet alle praktiske og upraktiske ting før du pakker sekken? Hvis ikke kan jeg sikkert hjelpe deg. ;)',
        time: 5000,
    },
    {
        text: 'Etter 20++ år med å sette på klokka til samme tid, er det endelig rom for et liv uten alarmer og møterom.',
        time: 5000,
    },
    {
        text: 'Kos deg med pensjonisttilværelsen, og husk at du ikke trenger å drikke kakao på autopilot lenger!',
        time: 5000,
    },
    {
        text: 'Empatisk KI-generert klem fra hjelpsomme Frida.',
        time: 4000,
    },
    {
        text: '(Og en 100% naturlig klem fra hele nav.no-teamet!)',
        time: 8000,
    },
    {
        text: '<Incoming transmission 🤖>',
        time: 4000,
    },
    {
        text: 'Nye opplysninger i saken din:',
        time: 4000,
    },
    {
        text: 'Jeg må orientere deg om at pensjonssøknaden din (dessverre) er trukket tilbake - du må jobbe til du er 95, minst! Det gjenstår fortsatt mye jobb på nav.no - og med organisasjonen for øvrig! 🌸',
        time: 6000,
    },
];

export const SurpriseFrida = ({ animate, stop }: Props) => {
    const [showChat, setShowChat] = useState(false);
    const [showBalloon, setShowBalloon] = useState(false);

    useEffect(() => {
        if (!animate) {
            return;
        }

        setTimeout(() => setShowChat(true), 1000);
        setTimeout(() => setShowBalloon(true), 2000);
    }, [animate]);

    return (
        <div className={classNames(style.wrapper, animate && style.animate)}>
            <Frida animate={animate} />
            {showChat && <ChatBubble stop={stop} />}
            {showBalloon && <SurpriseDecoration />}
        </div>
    );
};

const ChatBubble = ({ stop }: Pick<Props, 'stop'>) => {
    const [msgIndex, setMsgIndex] = useState(0);
    const [showEndButton, setShowEndButton] = useState(false);

    const isLastMsg = msgIndex === messages.length - 1;

    useEffect(() => {
        const nextIndex = msgIndex + 1;

        if (messages.length > nextIndex) {
            const current = messages[msgIndex];
            setTimeout(() => setMsgIndex(nextIndex), current.time);
        }
    }, [msgIndex]);

    useEffect(() => {
        if (!isLastMsg) {
            return;
        }

        setTimeout(() => setShowEndButton(true), 20000);
    }, [isLastMsg]);

    return (
        <div className={style.chatBubble}>
            <div className={style.msgWrapper}>
                {messages.slice(0, msgIndex + 1).map((msg, index) => (
                    <BodyLong size={'large'} className={style.chatMsg} key={index}>
                        {msg.text}
                    </BodyLong>
                ))}
                {!isLastMsg && (
                    <BodyLong size={'large'} className={style.loading}>
                        {''}
                    </BodyLong>
                )}
                {showEndButton && (
                    <LenkeInline
                        href={'#'}
                        className={style.makeitstop}
                        onClick={(e) => {
                            e.preventDefault();
                            Cookie.set('nosurprise', 'true', { path: '/', expires: 365 });
                            stop();
                        }}
                    >
                        {'Det er nok nå, Frida!'}
                    </LenkeInline>
                )}
            </div>
        </div>
    );
};

const Frida = ({ animate }: Pick<Props, 'animate'>) => {
    return (
        <svg
            focusable="false"
            fill="none"
            height="50"
            viewBox="0 0 50 50"
            width="50"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames(style.frida, animate && style.animate)}
        >
            <path d="m0 0h50v50h-50z" fill="#ffffff"></path>
            <g clipRule="evenodd" fillRule="evenodd">
                <path
                    d="m25.4107 5.93134c7.2327 0 13.1503 6.50576 13.8073 14.79556.4724.224.796.7295.796 1.3096v4.457c0 .7417-.5291 1.3609-1.2214 1.4312l-.1316.0066c-.0797 0-.1577-.0072-.2334-.0211-1.1596 3.711-3.4321 6.7926-6.3444 8.6781l.15 1.6521-.0008.0673-1.5739 11.6881h-9.9819l-.0414-.2863-1.9298-11.4253.0717-1.6709c-2.9267-1.8806-5.2116-4.9669-6.3786-8.6887l-.1198.0067c-.7549 0-1.353-.6501-1.353-1.4378v-4.457c0-.5279.2686-.9943.673-1.2445.6308-8.3204 6.5602-14.86066 13.812-14.86066z"
                    fill="#e7e5e2"
                ></path>
                <path
                    d="m20.6383 24.1901c-.9363.0708-1.1983-1.3156-.9162-2.2211.053-.1716.363-.9529.9117-.9529.5481 0 .7901.4271.8237.5005.4031.8827.2051 2.5955-.8192 2.6735zm10.4496 0c.9363.0708 1.1984-1.3156.9163-2.2211-.0531-.1716-.363-.9529-.9117-.9529-.5481 0-.7901.4271-.8237.5005-.4032.8827-.2052 2.5955.8191 2.6735z"
                    fill="#59514b"
                ></path>
                <path
                    d="m26.1601 25.784c.5506-.0851.9266-.0317 1.0613.1344.5084.6276.3458 1.2916-.5264 1.8366-.4585.2865-1.0897.3873-1.4238.2388-.1634-.0727-.3545.0015-.4268.1657-.0723.1641.0015.356.1649.4287.5523.2455 1.4016.1098 2.0275-.2812 1.1852-.7408 1.4564-1.8484.6864-2.799-.3259-.4018-.9027-.4837-1.6616-.3664-.1766.0273-.2977.1933-.2705.3707.0271.1774.1924.2991.369.2717zm3.6879 4.7389c-.0292.0672-.0961.1957-.2036.3651-.1821.2866-.4107.574-.6884.842-.8275.7987-1.9045 1.2605-3.2753 1.2183-1.3366-.0412-2.4088-.4959-3.2495-1.2291-.3086-.2692-.5635-.5575-.7671-.8449-.1201-.1694-.1951-.2979-.2279-.3649-.0789-.161-.2729-.2273-.4332-.1481-.1603.0793-.2263.2741-.1474.4352.0475.097.14.2554.2814.4548.2321.3275.5207.6541.87.9587.949.8277 2.1617 1.342 3.6538 1.3879 1.5538.0479 2.796-.4847 3.7435-1.3991.3168-.3058.5772-.6331.7856-.9612.1267-.1995.2091-.3578.2511-.4546.0715-.1645-.0033-.3561-.167-.4279-.1638-.0718-.3545.0033-.426.1678z"
                    fill="#59514b"
                ></path>
            </g>
            <path
                d="m19.2635 37.0261-.0018-.054c0 3.039 2.819 6.1912 6.2963 6.1912 3.4418 0 6.2386-3.088 6.2955-6.0979 1.801.4849 4.478 1.8245 6.704 4.0251 2.2256 2.2 4.0005 5.5087 4.0005 8.0762v.8333h-33.99996v-.8333c0-2.5623 1.73746-5.8654 3.92266-8.0629 2.2571-2.2698 4.9918-3.6278 6.7828-4.0777z"
                fill="#5c4378"
            ></path>
            <path
                d="m19.2635 37.0261-.0018-.054c0 3.039 2.819 6.1912 6.2963 6.1912 3.4418 0 6.2386-3.088 6.2955-6.0979 1.801.4849 4.478 1.8245 6.704 4.0251 2.2256 2.2 4.0005 5.5087 4.0005 8.0762v.8333h-33.99996v-.8333c0-2.5623 1.73746-5.8654 3.92266-8.0629 2.2571-2.2698 4.9918-3.6278 6.7828-4.0777z"
                fill="#5c4378"
            ></path>
            <path
                d="m19.313 37.6253c-1.6411.591-4.7803 1.5439-6.8631 3.5059-6.08822-1.344-8.62715-4.4767-8.62715-4.4767s5.6092-5.4275 5.61258-14.9202v-.0101c0-11.1153 6.04927-18.78408 16.01557-18.78408 9.9676 0 16.0169 7.66878 16.0169 18.78408h.0358c0 9.4995 5.6133 14.9303 5.6133 14.9303s-2.2904 3.105-8.3786 4.4471l-.1328.039c-2.0117-1.8154-5.0728-3.158-6.6602-3.75l-.1485-.044-.0612-.6665.0341-.0583c2.9951-1.9005 5.3191-5.1022 6.4395-8.971.1372.0757.2921.1183.456.1183.561 0 1.0149-.4967 1.0149-1.1118v-4.4863c0-.5264-.3323-.9664-.7796-1.0825-.0004-.0061-.0009-.0121-.0013-.0182-14.1607 1.5675-19.2617-8.0638-19.6804-8.0644 0 0-4.7027 3.3553-6.9504 7.3445 0 0-.3425.753-.3442.7784-.3848.1578-.6592.5644-.6592 1.0422v4.4863c0 .6151.455 1.1118 1.0148 1.1118.124 0 .2429-.0243.3527-.0688 1.1328 3.8706 3.3974 7.0328 6.4066 8.9208l.0852.059.1887.1207z"
                fill="#d2654c"
            ></path>
            <path
                d="m19.313 37.6253c-1.6411.591-4.7803 1.5439-6.8631 3.5059-6.08822-1.344-8.62715-4.4767-8.62715-4.4767s5.6092-5.4275 5.61258-14.9202v-.0101c0-11.1153 6.04927-18.78408 16.01557-18.78408 9.9676 0 16.0169 7.66878 16.0169 18.78408h.0358c0 9.4995 5.6133 14.9303 5.6133 14.9303s-2.2904 3.105-8.3786 4.4471l-.1328.039c-2.0117-1.8154-5.0728-3.158-6.6602-3.75l-.1485-.044-.0612-.6665.0341-.0583c2.9951-1.9005 5.3191-5.1022 6.4395-8.971.1372.0757.2921.1183.456.1183.561 0 1.0149-.4967 1.0149-1.1118v-4.4863c0-.5264-.3323-.9664-.7796-1.0825-.0004-.0061-.0009-.0121-.0013-.0182-14.1607 1.5675-19.2617-8.0638-19.6804-8.0644 0 0-4.7027 3.3553-6.9504 7.3445 0 0-.3425.753-.3442.7784-.3848.1578-.6592.5644-.6592 1.0422v4.4863c0 .6151.455 1.1118 1.0148 1.1118.124 0 .2429-.0243.3527-.0688 1.1328 3.8706 3.3974 7.0328 6.4066 8.9208l.0852.059.1887.1207z"
                fill="#d2654c"
            ></path>
        </svg>
    );
};
