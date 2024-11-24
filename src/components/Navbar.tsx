import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between p-2 rounded-xl mt-2 ">
      <h1 className=" dark:text-white underline text-sm font-extrabold ml-10">RBAC Management</h1>
      <ModeToggle  />
    </div>
  );
}
