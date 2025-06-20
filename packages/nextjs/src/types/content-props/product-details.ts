export enum ProductDetailType {
    RATES = 'rates',
    PAYOUT_DATES = 'payout_dates',
    PROCESSING_TIMES = 'processing_times',
    ALL_PRODUCTS = 'all_products',
}

export enum ProcessingTimesVisibilityType {
    ALL = 'all',
    APPLICATION = 'application',
    COMPLAINT = 'complaint',
}

export type ProductDetailsProps = {
    detailType: ProductDetailType;
};
