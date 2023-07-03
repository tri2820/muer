import React, { useState, useEffect } from 'react';

export const CImage = ({ src, children, className, containerClassName, brokenImageCallback, displayPlaceholder, widthLargerThan = 1200, heightLargerThan = 600 }: any) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            if (image.naturalWidth <= widthLargerThan || image.naturalHeight <= heightLargerThan) {
                console.log(`image ${src} does not meet standard`)
                brokenImageCallback?.(src)
                return;
            }
            setIsLoaded(true);
        };
        image.onerror = () => {
            brokenImageCallback?.(src)
        }
    }, [src]);

    const placeholder = displayPlaceholder ? <div className={className} /> : <></>;
    if (!src) return placeholder;
    if (!isLoaded) return placeholder;

    return <div className={`relative ${containerClassName}`}>
        <img src={src} alt="Preloaded Image" className={className} />
        <div
        // className='absolute bottom-0 w-full'
        >
            {children}
        </div>
    </div>
};

export default CImage;
