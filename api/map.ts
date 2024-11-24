export const fetchTripInformation = async (snap: any) => {
  return await fetch(
    `http://167.71.53.45/api/distance?start_lat=${snap.fromLat}&start_long=${snap.fromLon}&dest_lat=${snap.toLat}&dest_long=${snap.toLon}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      console.log("ERROR");
    });
};

export const postRequestRide = async (
  price: number,
  start: string,
  start_lat: number,
  start_long: number,
  dest: string,
  dest_lat: number,
  dest_long: number
) => {
  return await fetch(`http://167.71.53.45/api/ride`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price: price,
      start: start,
      start_lat: start_lat,
      start_long: start_long,
      dest: dest,
      dest_lat: dest_lat,
      dest_long: dest_long,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      console.log("ERROR");
    });
};
