export interface QbrickMeta {
    id: string;
    created: Date;
    updated: Date;
    tags: string[];
    rel: string[];
    asset?: Asset;
    metadata: Metadata;
    tracks: string[];
    catalog?: Catalog;
    thumbnails: {
        id: string;
    }[];
}

export interface Asset {
    id: string;
    created: Date;
    updated: Date;
    createdBy: Catalog;
    updatedBy: Catalog;
    name: string;
    rel: string[];
    resources: Resource[];
    references: AssetReference[];
}

export interface Catalog {
    id: string;
}

export interface AssetReference {
    id: string;
    type: string;
}

export interface Resource {
    type: Type;
    id: string;
    rel: string[];
    renditions: Rendition[];
    language?: string;
}

export interface Rendition {
    type: Type;
    width?: number;
    height?: number;
    id: string;
    size: number;
    links: Link[];
    references?: RenditionReference[];
    language?: string;
    videos?: Video[];
}

export interface Link {
    href: string;
    mimeType: string;
}

export interface RenditionReference {
    order: number;
    item: Item;
}

export interface Item {
    resource: Catalog;
    rendition: Catalog;
}

export enum Type {
    Image = 'image',
    Index = 'index',
    Subtitle = 'subtitle',
    Video = 'video',
}

export interface Video {
    bitrate: number;
    codec: string;
    width: number;
    height: number;
    duration: number;
    audios: Audio[];
}

export interface Audio {
    codec: string;
    sampleRate: number;
    bitDepth: number;
    channels: number;
}

export interface Metadata {
    title: string;
}
