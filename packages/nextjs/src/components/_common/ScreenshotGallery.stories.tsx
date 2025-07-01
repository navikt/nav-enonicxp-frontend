import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Add this type declaration for webpack's require.context
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
    const tab = initialTab;

    useEffect(() => {
        // Function to automatically discover all PNG files in the screenshots directory
        const discoverScreenshots = async () => {
            try {
                // Use require.context to dynamically import all PNG files
                // This works in Storybook's webpack environment
                const screenshotContext = require.context(
                    '../../../public/screenshot.spec.ts-snapshots',
                    false,
                    /\.png$/
                );

                const files = screenshotContext.keys().map((key) => {
                    const moduleData = screenshotContext(key);

                    // Handle different module formats
                    let url: string;
                    if (typeof moduleData === 'string') {
                        url = moduleData;
                    } else if (moduleData && typeof moduleData === 'object') {
                        // Try to get the src property from the module
                        const moduleObj = moduleData as any;
                        const defaultExport = moduleObj.default;
                        const imageData =
                            typeof defaultExport === 'function' ? defaultExport() : defaultExport;
                        url = imageData?.src || '';
                    } else {
                        url = '';
                    }

                    // console.log('Module:', module, 'Extracted URL:', url, 'Type:', typeof url);

                    return {
                        path: key,
                        url,
                        filename: key.replace(/^\.\//, '').replace('.png', ''),
                    };
                });

                setScreenshotFiles(files);
            } catch (error) {
                // console.error('Error loading screenshots:', error);
                // Fallback to empty array if dynamic loading fails
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

    // Filter screenshots by tab
    const filteredFiles = screenshotFiles.filter((file) =>
        tab === 'desktop' ? file.filename.includes('-desktop-') : file.filename.includes('-mobile-')
    );

    return (
        <div style={{ padding: '20px' }}>
            <h2>Screenshot Gallery ({tab === 'desktop' ? 'Desktop' : 'Mobile'})</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {filteredFiles.map((file) => (
                    <div
                        key={file.url}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => setSelectedImage(file.url)}
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
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                                wordBreak: 'break-word',
                            }}
                        >
                            {file.filename}
                        </p>
                        {(() => {
                            const filename = file.filename;
                            if (!filename) return null;
                            const match = filename.match(/^(.*--.*?)(-|$)/);
                            const storyId = match ? match[1] : filename;
                            return (
                                <a
                                    href={`/?path=/story/${storyId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '12px',
                                        color: '#0070f3',
                                        textDecoration: 'underline',
                                        display: 'block',
                                        marginTop: '4px',
                                    }}
                                >
                                    View in Storybook
                                </a>
                            );
                        })()}
                    </div>
                ))}
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
    title: 'Screenshots/Gallery',
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
