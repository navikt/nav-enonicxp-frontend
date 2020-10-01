import React from 'react';
import { Region } from '../types/content-types/_schema';
import Image from '../components/part-components/image/Image';

interface Props {
    region: Region;
}

const DynamicRegion = (props: Props) => {
    const { region } = props;
    const components = region.components || [];

    return (
        <>
            {components.map((component) => (
                <div
                    key={component.path}
                    data-portal-component-type={component.type}
                    data-portal-component={component.path}
                    data-th-remove="tag"
                >
                    {component.type === 'image' && (
                        <Image _path={component?.image?._path} />
                    )}
                </div>
            ))}
        </>
    );
};

export default DynamicRegion;
