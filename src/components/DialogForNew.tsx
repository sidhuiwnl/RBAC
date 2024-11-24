import { User, Role } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { permissions } from "@/data";
import { useState } from "react";

export function DialogComponentForUser({
  children,
  setUsers,
  users,
}: {
  children: React.ReactNode;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextId =
      users.length > 0 ? String(Number(users[users.length - 1].id) + 1) : "1";

    const newUser = {
      id: nextId,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);

    setFormData({
      name: " ",
      email: " ",
      role: " ",
      status: " ",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-extrabold">Add User</DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Add users for the for manangement{" "}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label className="font-extrabold" htmlFor="user-name">
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50 dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="John Doe"
            required
          />
          <label className="font-extrabold" htmlFor="user-email">
            Email
          </label>
          <input
            id="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50  dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="JohnDoe@gmail.com"
            required
          />
          <label className="font-extrabold" htmlFor="role">
            Role
          </label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className="font-extrabold" htmlFor="Status">
            Status
          </label>
          <Select
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex space-x-2 justify-end ">
            <DialogClose className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring mt-2">
              Cancel
            </DialogClose>
            <button
              className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white mt-2"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateDialogForUser({
  children,
  user,
  setUsers,
}: {
  children: React.ReactNode;
  user: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "Admin",
    status: user.status || "Active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [id]: value,
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsers((prevData) =>
      prevData.map((prev) =>
        prev.id === user.id ? { ...prev, ...formData } : prev
      )
    );

    setFormData({
      name: " ",
      email: " ",
      role: " ",
      status: " ",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-extrabold">Update User</DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Update users for the for manangement{" "}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label className="font-extrabold" htmlFor="user-name">
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50   p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm dark:text-white"
            placeholder="John Doe"
            required
          />
          <label className="font-extrabold" htmlFor="user-email">
            Email
          </label>
          <input
            value={formData.email}
            id="email"
            onChange={handleChange}
            type="email"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50  p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm dark:text-white"
            placeholder="JohnDoe@gmail.com"
            required
          />
          <label className="font-extrabold" htmlFor="role">
            Role
          </label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleSelectChange("role", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <label className="font-extrabold" htmlFor="Status">
            Status
          </label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex space-x-2 justify-end ">
            <DialogClose className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring mt-2">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white mt-2"
            >
              UpdateUser
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DialogComponentForRole({
  children,
  roles,
  setRoles,
}: {
  children: React.ReactNode;
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    permissions: { name: string }[];
  }>({
    name: "",
    description: "",
    permissions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxchange = (key: string, value: string) => {
    setFormData((prev) => {
      const permissions = [...prev.permissions];

      const permissionIndex = permissions.findIndex(
        (item) => item.name === value
      );
      if (permissionIndex === -1) {
        permissions.push({
          name: value,
        });
      } else {
        permissions.splice(permissionIndex, 1);
      }
      return {
        ...prev,
        [key]: permissions,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newRole: Role = {
      id: (roles.length + 1).toString(),
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions,
    };

    setRoles((prevRoles) => [...prevRoles, newRole]);

    setFormData({
      name: "",
      description: "",
      permissions: [],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-extrabold">Add Role</DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Add users for the for manangement{" "}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label className="font-extrabold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50 dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="John Doe"
            required
          />
          <label className="font-extrabold" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            required
            value={formData.description}
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50 dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="Add the description of the role"
          />
          <label className="font-extrabold" htmlFor="permission">
            Permission
          </label>
          {permissions &&
            permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center space-x-3 text-sm"
              >
                <Checkbox
                  checked={formData.permissions.some(
                    (p) => p.name === permission.name
                  )}
                  onCheckedChange={() => {
                    handleCheckboxchange("permissions", permission.name);
                  }}
                />
                <label>{permission.name}</label>
                <p>({permission.description})</p>
              </div>
            ))}

          <div className="flex space-x-2 justify-end ">
            <DialogClose className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring mt-2">
              Cancel
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white mt-2"
            >
              Add Role
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateDialogForRole({
  children,
  role,
  setRoles,
}: {
  children: React.ReactNode;
  role: Role;
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    permissions: { name: string }[];
  }>({
    name: role.name || "",
    description: role.description || "",
    permissions: role.permissions || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (permissionName: string) => {
    setFormData((prev) => {
      const permissions = [...prev.permissions];
      const index = permissions.findIndex((p) => p.name === permissionName);

      if (index === -1) {
        permissions.push({ name: permissionName });
      } else {
        permissions.splice(index, 1);
      }

      return { ...prev, permissions };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update the role data in the setRoles function
    setRoles((prevRoles) =>
      prevRoles.map((r) => (r.id === role.id ? { ...r, ...formData } : r))
    );

    // Reset form data after update
    setFormData({
      name: "",
      description: "",
      permissions: [],
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-extrabold">Update Role</DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Update the role details for the role management system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label className="font-extrabold" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50 dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="Role Name"
            required
          />
          <label className="font-extrabold" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            value={formData.description}
            required
            onChange={handleChange}
            type="text"
            className="rounded-md shadow-sm py-2 text-sm dark:bg-black/50 dark:text-white p-2 border placeholder:dark:text-neutral-400 placeholder:text-sm"
            placeholder="Role Description"
          />
          <label className="font-extrabold">Permissions</label>
          {permissions &&
            permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-3 text-sm">
                <Checkbox
                  checked={formData.permissions.some((p) => p.name === permission.name)}
                  onCheckedChange={() => handleCheckboxChange(permission.name)}
                />
                <label>{permission.name}</label>
                <p>({permission.description})</p>
              </div>
            ))}

          <div className="flex space-x-2 justify-end">
            <DialogClose className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring mt-2">
              Cancel
            </DialogClose>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring bg-zinc-900 text-white mt-2"
            >
              Update Role
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
