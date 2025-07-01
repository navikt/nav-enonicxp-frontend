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

const ScreenshotGallery = ({ initialTab = 'desktop' }: { initialTab?: 'desktop' | 'mobile' }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [screenshotFiles, setScreenshotFiles] = useState<
        Array<{ path: string; url: string; filename: string }>
    >([]);
    const [loading, setLoading] = useState(true);
    const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
    const tab = initialTab;

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
                        url = imageData?.src || '';
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
        tab === 'desktop' ? file.filename.includes('-desktop-') : file.filename.includes('-mobile-')
    );

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {filteredFiles.map((file) => {
                    const filename = file.filename;
                    if (!filename) return null;
                    const match = filename.match(/^(.*--.*?)(-|$)/);
                    const storyId = match ? match[1] : filename;
                    const isHovered = hoveredUrl === file.url;
                    return (
                        <a
                            key={file.url}
                            href={`/?path=/story/${storyId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'outline-color 0.2s',
                                textDecoration: 'none',
                                color: 'inherit',
                                outline: isHovered ? '2px solid #0070f3' : '2px solid transparent',
                                outlineOffset: '2px',
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

            {selectedImage && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Full size screenshot"
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

const meta: Meta<typeof ScreenshotGallery> = {
    component: ScreenshotGallery,
    parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ScreenshotGallery>;

export const Mobile: Story = {
    render: () => <ScreenshotGallery initialTab="mobile" />,
};

export const Desktop: Story = {
    render: () => <ScreenshotGallery initialTab="desktop" />,
};
