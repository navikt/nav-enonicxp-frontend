import React from 'react';
import { Region } from '../types/content-types/_schema';
import Image from '../components/part-components/image/Image';

interface Props {
    region?: Region
}

const DynamicRegion = (props: Props) => {
    const { region } = props;

    if (!region) {
        return null;
    }

    return(
        <div data-portal-region={region.name}>
            {(region.components || []).map(component => (
                <div
                    key={component.path}
                    data-portal-component-type={component.type}
                    data-portal-component={component.path}
                    data-th-remove="tag">{{
                        image: <Image _path={component.image._path}/>
                    }[component.type]}
                </div>
            ))}
        </div>
    );
}

export default DynamicRegion;
