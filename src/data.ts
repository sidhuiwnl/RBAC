import { Permission, Role, User } from "./types";


export  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'Admin',
     
      status: 'active'
    },
    {
      id: '2',
      name: 'Michael Torres',
      email: 'michael.torres@example.com',
      role: 'Manager',
      
      status: 'active'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      role: 'Viewer',
      
      status: 'inactive'
    },
    
   
];

export const permissions : Permission[]= [{
    id : "1",
    name : "read:users",
    description : "View user information",
    module : "Users"

},{
    id: '2',
    name: 'write:users',
    description: 'Create and modify users',
    module: 'Users'
  },
  {
    id: '3',
    name: 'delete:users',
    description: 'Delete users',
    module: 'Users'
  },{
    id: '4',
    name: 'manage:roles',
    description: 'Manage roles and permissions',
    module: 'Roles'
  }
]

export const roles : Role[] = [
    {
        id : "1",
        name : "Admin",
        description  : "Full system access",
        permissions : permissions
    },{
        id : "2",
        name : "Manager",
        description : "User management access",
        permissions : permissions.filter(permission => permission.module === "Users")
    },{
        id : "3",
        name : "Viewer",
        description : "Read-only access",
        permissions : permissions.filter(permission => permission.name.startsWith("read"))
    }
]