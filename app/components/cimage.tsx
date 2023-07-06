import React, { useState, useEffect, useRef } from 'react';
import fallbackImage from '../../public/fallbackImage.jpg'


export const CImage = ({ src, className, brokenImageCallback, displayPlaceholder, widthLargerThan = 0, heightLargerThan = 0 }: any) => {
    const [errorLoadingImage, setErrorLoadingImage] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setErrorLoadingImage(false)
        setLoaded(false);
    }, [src]);
    const ref = useRef<any>();

    if (errorLoadingImage) return <img src={fallbackImage} alt="" className={className} />
    const placeholder = displayPlaceholder ? <div className={className} /> : <></>;
    if (!src) return placeholder;

    return <img ref={ref} src={src} className={
        className
        // `${className} ${loaded ? '' : 'opacity-0'}`
    }
        onError={() => {
            console.log('Cannot load image');
            brokenImageCallback?.(src);
            setErrorLoadingImage(true);
            setLoaded(true)
        }}
        onLoad={() => {
            if (ref?.current?.naturalWidth <= widthLargerThan || ref?.current?.naturalHeight <= heightLargerThan) {
                console.log(`image ${src} does not meet standard`)
                brokenImageCallback?.(src);
                setErrorLoadingImage(true);
                setLoaded(true)
                return;
            }

            setLoaded(true)
        }}
        loading="lazy"
    />
};

export default CImage;
