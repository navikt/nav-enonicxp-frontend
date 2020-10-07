export interface DynamicImage {
    type: 'image';
    path: string;
    image: {
        image: {
            imageUrl: string;
        };
    };
}
