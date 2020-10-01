import React from 'react';
import { enonicPathToAppPath } from '../../../utils/paths';

interface Props {
    _path: string
}

const Image = (props: Props) => {
    return <img src={enonicPathToAppPath(props._path)} />;
}

export default Image;
