import Navbar from "./Navbar";
import Users from "./UserCard";
import Roles from "./RoleCard";

export default function Main() {
  return (
    <div className="flex flex-col items-center ">
      <Navbar />
      <div className="max-w-4xl p-4  mt-10">
        <h1 className="text-xl font-extrabold tracking-tighter">Dashboard</h1>
        <p className="text-sm text-neutral-400 mb-10">
          Manage your organization's access control
        </p>
        <div className="flex flex-col space-y-10">
          <Users />
          <Roles />
        </div>
      </div>
    </div>
  );
}
