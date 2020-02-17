// export interface ApiUser {
//   id: number,
//   name: string;
//   username: string;
//   email: string;
//   address: UserAdress
//   phone: string,
//   website: string,
//   company: UserCompany
// }
export type ApiUser = User & {
  // id: number,
  address: UserAdress,
  company: UserCompany
}
export interface User {
  id: number
  phone: string,
  website: string,
  name: string;
  username: string;
  email: string;
}

interface UserAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: number
    lng: number
  }
}
interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
