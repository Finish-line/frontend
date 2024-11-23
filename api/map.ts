export const fetchTripInformation = async () => {
  delay(1000);
  return {
    price: Math.floor(Math.random() * 100),
    distance: Math.floor(Math.random() * 10000),
    duration: Math.floor(Math.random() * 100),
  };
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const postRequestRide = async () => {
  alert("Requesting ride...");
};
