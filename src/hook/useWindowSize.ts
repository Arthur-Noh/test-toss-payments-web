import { useCallback, useEffect, useState } from 'react';

type windowSizeType = {
    width: number | undefined,
    height: number | undefined,
};

const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [ windowSize, setWindowSize ] = useState<windowSizeType>({ width: undefined, height: undefined });

    // Handler to call on window resize
    const handleReSizer = useCallback(() => {
        // Set window width/height to state
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {        
        // Add event listener
        window.addEventListener('resize', handleReSizer);
        // Call handler right away so state gets update with initial window size;
        handleReSizer();
        // Remove event listener on cleanUp
        return () => window.removeEventListener('resize', handleReSizer);
    }, []);

    return windowSize;
};

export default useWindowSize;