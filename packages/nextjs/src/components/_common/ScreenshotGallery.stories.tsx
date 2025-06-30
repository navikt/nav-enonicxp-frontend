import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const ScreenshotGallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // This would be populated with your actual screenshot paths
    const screenshots = [
        '/components-common-accordion--default-desktop-linux-desktop-linux.png',
        '/playwright/screenshot.spec.ts-snapshots/components-layouts-index-page-area-page-banner-areapageheaderbanner--default-desktop-linux-desktop-linux.png',
        // ... add all your screenshots
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Screenshot Gallery</h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '20px',
                }}
            >
                {screenshots.map((screenshot, index) => (
                    <div
                        key={index}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                        onClick={() => setSelectedImage(screenshot)}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        <img
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '4px',
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
                            {screenshot.split('/').pop()?.replace('.png', '')}
                        </p>
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

export const Default: Story = {};
