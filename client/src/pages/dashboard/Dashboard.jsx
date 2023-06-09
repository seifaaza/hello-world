import Admins from "../../aside/aside-items/Admins";
import Aside from "../../aside/Aside";
import { Route, Routes } from "react-router-dom";
import Users from "../../aside/aside-items/Users";
import AdminProfil from "../../aside/aside-items/AdminProfil";
import Team from "../../aside/aside-items/Team";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 tablet:gap-10 z-10 pt-12 px-3 tablet:px-2 min-h-screen overflow-hidden">
      <div className="flex gap-10">
        <Aside />
        <div className="w-full flex flex-col items-center ">
          {" "}
          <Routes>
            <Route path="/admins" element={<Admins />} />
            <Route path="/users" element={<Users />} />
            <Route path="/admin-profile" element={<AdminProfil />} />
            <Route path="/team" element={<Team />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
