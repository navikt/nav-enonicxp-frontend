import dayjs from 'dayjs';

export const formatDate = (datetime: string) =>
    datetime ? dayjs(datetime).format('DD-MM-YYYY') : '';
