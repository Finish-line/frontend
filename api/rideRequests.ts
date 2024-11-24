export const fetchRideRequests = async () => {
  return await fetch(`http://167.71.53.45/api/rides`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
