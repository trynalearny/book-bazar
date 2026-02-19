import getBaseUrl from './baseURL';

function getImgUrl(name) {
    const base = getBaseUrl();
    if (!name) return `${base}/images/default-book.png`;
    return `${base}/images/${name}`;
}

export { getImgUrl }