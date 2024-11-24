import { useCallback, useState } from "react";
import { users as initialUsers } from "@/data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Ellipsis, User } from "lucide-react";
import { DialogComponentForUser, UpdateDialogForUser } from "./DialogForNew";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  

  const handleDelete = useCallback((id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  }, []);

  const handleRoleChange = useCallback((id: string, role: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role } : user))
    );
  }, []);

  const uniqueRoles = [...new Set(users.map((user) => user.role))];

  return (
    <div className="w-[1000px] rounded-xl border border-dashed shadow-sm">
      <header className="p-4 flex justify-between items-center border-b border-dashed">
        <div>
          <h1 className="font-extrabold tracking-tighter text-lg">Users</h1>
          <p className="text-sm text-gray-500">Manage user access and roles</p>
        </div>
        <div className="flex space-x-5 items-center">
          <DialogComponentForUser setUsers={setUsers} users={users}>
            <button className="px-6 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white">
              Add
            </button>
          </DialogComponentForUser>
        </div>
      </header>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="p-4 flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <User className="w-6 h-6 mr-2" />
              <div>
                <p className="font-extrabold">{user.name}</p>
                <p className="text-sm text-neutral-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                onValueChange={(value) => handleRoleChange(user.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={user.role} />
                </SelectTrigger>
                <SelectContent>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border p-3 rounded-lg bg-black flex flex-col space-y-3 hover:cursor-pointer">
                  <DropdownMenuItem 
                  
                  asChild>
                    <UpdateDialogForUser user={user} setUsers={setUsers}>
                      <span className="text-white">Edit</span>
                    </UpdateDialogForUser>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>No users found. Add a user to get started.</p>
        </div>
      )}
    </div>
  );
}
