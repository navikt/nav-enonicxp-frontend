import React, { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

export const SurpriseConfetti = () => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        const initParticles = async () => {
            const initParticlesEngine = (await import('@tsparticles/react')).initParticlesEngine;
            const loadAll = (await import('@tsparticles/all')).loadAll;

            return initParticlesEngine(async (engine) => {
                // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
                // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
                // starting from v2 you can add only the features you need reducing the bundle size
                await loadAll(engine);
            });
        };

        initParticles().then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    const optionsSides: ISourceOptions = {
        fullScreen: {
            zIndex: 1,
        },
        emitters: [
            {
                position: {
                    x: 0,
                    y: 30,
                },
                rate: {
                    quantity: 5,
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
                    x: 100,
                    y: 30,
                },
                rate: {
                    quantity: 5,
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
                            width: 32,
                            height: 32,
                            particles: {
                                size: {
                                    value: 8,
                                },
                            },
                        },
                        {
                            src: 'https://www.nav.no/dekoratoren/media/nav-logo-white.svg',
                            width: 32,
                            height: 32,
                            particles: {
                                size: {
                                    value: 8,
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

    return (
        <Particles
            id={'tsparticles'}
            particlesLoaded={async (container) => console.log(container)}
            options={optionsSides}
        />
    );
};
