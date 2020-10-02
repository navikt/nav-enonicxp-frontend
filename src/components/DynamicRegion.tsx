import React from 'react';
import { Component, Region } from '../types/content-types/_schema';
import Image from '../components/part-components/image/Image';

interface Props {
    region: Region;
    components: Component[];
}

const DynamicRegion = (props: Props) => {
    const pageComponent = props.components || [];
    const regionComponent = props.region.components || [];

    return (
        <>
            {regionComponent.map((component) => {
                return (
                    <div
                        key={component.path}
                        data-portal-component-type={component.type}
                        data-portal-component={component.path}
                        data-th-remove="tag"
                    >
                        {component.type === 'image' && (
                            <Image
                                {...pageComponent.filter(
                                    (e) => e.path === component.path
                                )[0]}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default DynamicRegion;
