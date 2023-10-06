import ContentLoader from "react-content-loader";

function SearchResultSkeleton() {
    const fakeCount = 3;
    const width = 600;
    const fakeHeight = 39;
    const fakeGap = 10;

    return (
        <ContentLoader
            speed={2}
            width={width}
            height={fakeCount * fakeHeight + (fakeCount - 1) * fakeGap}
            >
            <rect x="0" y="0" rx="3" ry="3" width={width} height={fakeHeight} /> 
            <rect x="0" y={fakeHeight + fakeGap} rx="3" ry="3" width={width} height={fakeHeight} /> 
            <rect x="0" y={(fakeHeight + fakeGap) * 2} rx="3" ry="3" width={width} height={fakeHeight} /> 
        </ContentLoader>
    )
}

export default SearchResultSkeleton;