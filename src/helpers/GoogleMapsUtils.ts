export const loadMapApi = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBbORSZJBXcqDnY6BbMx_JSP0l_9HLQSkw&libraries=geometry,places&v=quarterly`;
    const scripts = document.getElementsByTagName('script');
    // Go through existing script tags, and return google maps api tag when found.
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapsURL;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    return googleMapScript;
};