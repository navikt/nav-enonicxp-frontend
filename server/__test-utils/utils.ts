import next from 'next';
import path from 'path';

export const __getNextTestApp = () =>
    next({
        conf: {},
        dir: path.join(__dirname, 'next-dummy'),
    });
