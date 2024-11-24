import { roles as initailRoles } from "@/data";
import { Shield, Check } from "lucide-react";

import { DialogComponentForRole, UpdateDialogForRole } from "./DialogForNew";
import { useCallback, useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState(initailRoles);

  const handleDelete = useCallback(
    (id: string) => {
      if (roles.length >= 1) {
        setRoles((prev) => prev.filter((role) => role.id !== id));
      }
    },
    [roles]
  );

  return (
    <div className="w-[1000px] rounded-xl border border-dashed mt-3 shadow-sm">
      <header className="p-4 flex justify-between items-center border-b border-dashed">
        <div>
          <h1 className="font-extrabold tracking-tighter text-lg">Roles</h1>
          <p className="text-sm text-gray-500">Define role permissions</p>
        </div>
        <div>
          <DialogComponentForRole roles={roles} setRoles={setRoles}>
            <button className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white">
              Add Roles
            </button>
          </DialogComponentForRole>
        </div>
      </header>
      {roles.length > 0 ? (
        roles.map((role) => (
          <div key={role.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6" />
              <div>
                <p className="font-extrabold ">{role.name}</p>
                <p className="text-sm text-neutral-500">{role.description}</p>
              </div>
            </div>
            <div className=" flex items-center">
              {role.permissions.slice(0, 3).map((permission) => (
                <span
                  key={role.id}
                  className=" flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 border border-neutral-300"
                  title={permission.name}
                >
                  <Check className="text-neutral-600" />
                </span>
              ))}
              {role.permissions.length > 3 && (
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 border border-neutral-300 text-xs text-blue-600">
                  +{role.permissions.length - 3}
                </span>
              )}
              <UpdateDialogForRole role={role} setRoles={setRoles}>
                <button className="text-sm ml-4">Edit</button>
              </UpdateDialogForRole>
              <button
                onClick={() => handleDelete(role.id)}
                className="text-red-500 text-sm ml-4"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>No Roles found. Add a Roles to get started.</p>
        </div>
      )}
    </div>
  );
}
