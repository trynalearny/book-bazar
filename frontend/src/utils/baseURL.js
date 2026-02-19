const getBaseUrl = () => {
    // DEBUG: show which API URL was inlined at build time
    // This will print in the browser console of the deployed site after Netlify rebuilds.
    try {
        console.log('DEBUG - VITE_API_URL (build-time):', import.meta.env.VITE_API_URL);
    } catch (e) {
        // ignore in environments where console or import.meta is restricted
    }
    return import.meta.env.VITE_API_URL || "http://localhost:5000"
}

export default getBaseUrl;