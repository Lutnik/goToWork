module.exports = function createQueryUrl(origins, destinations, gmapsKey) {
  try {
    const originsQuery = origins.reduce((accu, next) => {
      accu += `place_id:${next.placeId}|`;
      return accu;
    }, '').slice(0, -1);
    const destQuery = destinations.reduce((accu, next) => {
      accu += `place_id:${next.placeId}|`;
      return accu;
    }, '').slice(0, -1);
    return `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originsQuery}&destinations=${destQuery}&departure_time=now&key=${gmapsKey}`;
  } catch (err) {
    return null;
  }
};
