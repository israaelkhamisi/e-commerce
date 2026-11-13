// One saved address (Route API: GET /api/v1/addresses → data[])
export interface IAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
