import next from 'next';
import path from 'path';

export const getNextApp = () =>
    next({
        conf: {},
        dir: path.join(__dirname, '__next-dummy'),
    });
