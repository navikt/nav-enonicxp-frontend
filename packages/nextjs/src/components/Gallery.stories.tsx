import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

declare const require: {
    context: (
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp
    ) => {
        keys: () => string[];
        (id: string): string | { default: string };
    };
};

const Gallery = ({ deviceType = 'desktop' }: { deviceType?: 'desktop' | 'mobile' }) => {
    const [screenshotFiles, setScreenshotFiles] = useState<
        Array<{ path: string; url: string; filename: string }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);

    useEffect(() => {
        const discoverScreenshots = async () => {
            try {
                const screenshotContext = require.context(
                    '../../public/screenshot.spec.ts-snapshots',
                    false,
                    /\.png$/
                );

                const files = screenshotContext.keys().map((key) => {
                    const moduleData = screenshotContext(key);

                    let url: string;
                    if (typeof moduleData === 'string') {
                        url = moduleData;
                    } else if (moduleData && typeof moduleData === 'object') {
                        const moduleObj = moduleData as any;
                        const defaultExport = moduleObj.default;
                        const imageData =
                            typeof defaultExport === 'function' ? defaultExport() : defaultExport;
                        url = imageData?.src ?? '';
                    } else {
                        url = '';
                    }

                    return {
                        path: key,
                        url,
                        filename: key.replace(/^\.\//, '').replace('.png', ''),
                    };
                });

                setScreenshotFiles(files);
            } finally {
                setLoading(false);
            }
        };

        discoverScreenshots();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Loading Screenshots...</h2>
            </div>
        );
    }

    const filteredFiles = screenshotFiles.filter((file) =>
        deviceType === 'desktop'
            ? file.filename.includes('-desktop-')
            : file.filename.includes('-mobile-')
    );

    const base =
        window.location.origin +
        (window.location.pathname.includes('/nav-enonicxp-frontend/')
            ? '/nav-enonicxp-frontend'
            : '');

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                padding: '20px',
            }}
        >
            {filteredFiles.map((file) => {
                const filename = file.filename;
                if (!filename) return null;
                const storyId = filename.split(/-(mobile|desktop|darwin)/)[0];
                const isHovered = hoveredUrl === file.url;
                return (
                    <a
                        key={file.url}
                        href={`${base}/?path=/story/${storyId}`}
                        target="_parent"
                        style={{
                            display: 'block',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            transition: 'outline-color 0.2s',
                            outline: isHovered ? '2px solid #0070f3' : '2px solid transparent',
                        }}
                        onMouseEnter={() => setHoveredUrl(file.url)}
                        onMouseLeave={() => setHoveredUrl(null)}
                    >
                        <img
                            src={file.url}
                            alt={file.filename}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '4px',
                            }}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </a>
                );
            })}
        </div>
    );
};

const meta: Meta<typeof Gallery> = {
    component: Gallery,
    parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Mobile: Story = {
    render: () => <Gallery deviceType="mobile" />,
};
