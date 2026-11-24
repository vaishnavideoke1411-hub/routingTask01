export interface Iuser {
  id: string;
  Uid: string;
  name: string;
  role: string;
  userRole: "Admin" | "Candidate";
  experience: number;
  status: boolean;
  description: string;
  skills: string[];
  address: Iaddress;
  imageUrl: string;
  uid:string
}

export interface Iaddress{
  currentAddress : Icurreent
  permanentAddress : Ipermanent

}

export interface Icurreent {
  country: string;
  state: string;
  city: string;
  zipcode: string;
}
    
    
export interface Ipermanent{
  country: string;
  state: string;
  city: string;
  zipcode: string;
    
};




// export interface Iuser {
//   id?: string;
//   Uid: string;
//   name: string;
//   role: string;
//   userRole: 'Admin' | 'Candidate';
//   experience: number;
//   status: boolean;
//   description: string;
//   skills: string[];
//   address: IAddress;
//   imageUrl: string;
// }

// export interface IAddress {
//   currentAddress: ICurrentAddress;
//   permanentAddress: IPermanentAddress;
// }

// export interface ICurrentAddress {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: number;
// }

// export interface IPermanentAddress {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: number;
// }