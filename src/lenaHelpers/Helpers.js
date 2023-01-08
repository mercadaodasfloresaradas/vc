/* eslint-disable react-hooks/rules-of-hooks */
export const getCSSQuery = (useMediaQuery, wantedQuery) => {
    const isXL = useMediaQuery({ query: '(min-width: 1824px)' });
    const isLG = useMediaQuery({ query: '(max-width: 1224px)' });
    const isMD = useMediaQuery({ query: '(max-width: 766px)' });
    const isSMD = useMediaQuery({ query: '(max-width: 450px)' });
    const isSM = useMediaQuery({ query: '(max-width: 360px)' });

    switch (wantedQuery) {
        case "xl":
            return isXL;
        case "lg":
            return isLG;
        case "md":
            return isMD;
        case "smd":
            return isSMD;
        case "sm":
            return isSM;
    
        default:
            return false;
    }
}