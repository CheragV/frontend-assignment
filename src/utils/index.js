export function checkCoordinatesDistance(lat1, lon1, lat2, lon2) {
    // console.log('DISTANCE CHECK: ', lat1, lon1, lat2, lon2);
    let dLat, dLon, a, c, d;
    if (lat2 && lon2) {
        const R = 6371; // Radius of the earth in km

        dLat = (lat2 - lat1) * (Math.PI / 180);
        dLon = (lon2 - lon1) * (Math.PI / 180);
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = R * c; // Distance in km
    }
    return d;
}


export const getUserCoordinates = async (cb) => {
    if (!navigator.geolocation) {
        console.log('Browser does not have gps permission!')
        cb({
            lat1: null,
            lon1: null,
        })
    }

    let coordinates = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
    cb({
        lat1: coordinates.coords.longitude,
        lon1: coordinates.coords.latitude,
    });
}

export const getImageDimensions = (resources, index) => {
    let length = resources.length;
    let height = 100;
    let width = 100

    switch (length) {
        case 1:
            height = 100;
            width = 100;
            break;
        case 2:
            height = 50;
            width = 100;
            break;
        case 3:
            if (index === 0) {
                height = 50;
                width = 100;
            } else {
                height = 50;
                width = 50;
            }
            break;
        case 4:
            height = 50;
            width = 50;
            break;
        default:
            height = 100;
            width = 100;
    }
    return { height, width }

}