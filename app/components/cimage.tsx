import React, { useState, useEffect, useRef } from 'react';
import fallbackImage from '../../public/fallbackImage.jpg'


export const CImage = ({ src, className, brokenImageCallback, displayPlaceholder, widthLargerThan = 0, heightLargerThan = 0 }: any) => {
    const [errorLoadingImage, setErrorLoadingImage] = useState(false);
    useEffect(() => {
        setErrorLoadingImage(false)
    }, [src]);
    const ref = useRef<any>();

    if (errorLoadingImage) return <img src={fallbackImage} className={className} />
    const placeholder = displayPlaceholder ? <div className={className} /> : <></>;
    if (!src) return placeholder;

    return <img ref={ref} src={src} className={className}
        onError={() => {
            console.log('Cannot load image');
            brokenImageCallback?.(src);
            setErrorLoadingImage(true);
        }}
        onLoad={() => {
            console.log(
                'ref?.current?.naturalWidth',
                ref?.current?.naturalWidth)

            console.log(
                'ref?.current?.naturalHeight',
                ref?.current?.naturalHeight)

            if (ref?.current?.naturalWidth <= widthLargerThan || ref?.current?.naturalHeight <= heightLargerThan) {
                console.log(`image ${src} does not meet standard`)
                brokenImageCallback?.(src);
                setErrorLoadingImage(true);
                return;
            }
        }} />
};

export default CImage;
