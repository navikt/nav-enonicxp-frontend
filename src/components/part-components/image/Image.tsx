import React from 'react';
import { enonicPathToAppPath } from '../../../utils/paths';
import { Image } from '../../../types/content-types/_schema';

const Img = (props: Image) => {
    return <img src={enonicPathToAppPath(props._path)} />;
};

export default Img;
