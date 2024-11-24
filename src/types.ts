

export interface User {
  id: string,
  name: string,
  email: string,
  role: string,
  
  status: string,
}

export interface Permission{
  id? : string ,
  name : string 
  description? : string ,
  module? : string ,
}

export interface Role {
  id : string,
  name : string,
  description : string,
  permissions : Permission[]
}