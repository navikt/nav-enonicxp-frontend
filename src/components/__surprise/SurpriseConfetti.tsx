import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { ISourceOptions } from '@tsparticles/engine';

import style from './SurpriseConfetti.module.scss';

export const SurpriseConfetti = ({ start }: { start: boolean }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        const initParticles = async () => {
            return initParticlesEngine((engine) => {
                return loadFull(engine);
            });
        };

        initParticles().then(() => {
            setInit(true);
        });
    }, []);

    if (!init || !start) {
        return null;
    }

    return (
        <>
            <div className={style.bg} />
            <Particles id={'tsparticles'} options={confettiOptions} />
        </>
    );
};

const confettiOptions: ISourceOptions = {
    fullScreen: {
        zIndex: 1,
    },
    emitters: [
        {
            position: {
                x: 10,
                y: 30,
            },
            rate: {
                quantity: 4,
                delay: 0.15,
            },
            particles: {
                move: {
                    direction: 'top-right',
                    outModes: {
                        top: 'none',
                        left: 'none',
                        default: 'destroy',
                    },
                },
            },
        },
        {
            position: {
                x: 90,
                y: 30,
            },
            rate: {
                quantity: 4,
                delay: 0.15,
            },
            particles: {
                move: {
                    direction: 'top-left',
                    outModes: {
                        top: 'none',
                        right: 'none',
                        default: 'destroy',
                    },
                },
            },
        },
    ],
    particles: {
        color: {
            value: ['#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
        },
        move: {
            decay: 0.05,
            direction: 'top',
            enable: true,
            gravity: {
                enable: true,
            },
            outModes: {
                top: 'none',
                default: 'destroy',
            },
            speed: {
                min: 10,
                max: 50,
            },
        },
        number: {
            value: 0,
        },
        opacity: {
            value: 1,
        },
        rotate: {
            value: {
                min: 0,
                max: 360,
            },
            direction: 'random',
            animation: {
                enable: true,
                speed: 30,
            },
        },
        tilt: {
            direction: 'random',
            enable: true,
            value: {
                min: 0,
                max: 360,
            },
            animation: {
                enable: true,
                speed: 30,
            },
        },
        size: {
            value: {
                min: 2,
                max: 4,
            },
            animation: {
                enable: true,
                startValue: 'min',
                count: 1,
                speed: 16,
                sync: true,
            },
        },
        roll: {
            darken: {
                enable: true,
                value: 25,
            },
            enable: true,
            speed: {
                min: 5,
                max: 15,
            },
        },
        wobble: {
            distance: 30,
            enable: true,
            speed: {
                min: -7,
                max: 7,
            },
        },
        shape: {
            type: ['circle', 'square', 'triangle', 'polygon', 'image'],
            options: {
                polygon: [
                    {
                        sides: 5,
                    },
                    {
                        sides: 6,
                    },
                ],
                image: [
                    {
                        src: 'https://www.nav.no/dekoratoren/media/nav-logo-red.svg',
                        width: 16,
                        height: 16,
                        particles: {
                            size: {
                                value: 16,
                            },
                        },
                    },
                    {
                        src: 'https://www.nav.no/dekoratoren/media/nav-logo-white.svg',
                        width: 16,
                        height: 16,
                        particles: {
                            size: {
                                value: 16,
                            },
                        },
                    },
                ],
            },
        },
    },
    fpsLimit: 60,
    delay: 2,
};
