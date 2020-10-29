const orderer: { [key: string]: number } = {
  first_name: 1,
  last_name: 2,
  address: 3,
  phone_number: 4,
  city: 5,
  state: 6,
  country: 7,
};

export function sortFunction(a: any, b: any) {
  if (orderer[a] > orderer[b]) return 1;
  if (orderer[b] > orderer[a]) return -1;
  return 0;
};
