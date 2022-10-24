import Dashboard from "./pages/Dashboard";
import projectGuide from "./pages/projectGuide";

import Departments from "./pages/Departments"
import students from "./pages/students"
import AddDep from "./components/DepComponetns/AddDep";
import EditDep from "./components/DepComponetns/EditDep"

const routes = [
  { path: "/dashboard", name: "Home", element: Dashboard, exact: true },
  { path: "/projectguide", name: "Project Guide", element: projectGuide },
  { path: "/departments", name: "Departments", element: Departments },
  { path: "/department/add", name: "AddDepartment", element: AddDep },
  { path: "/department/edit/:id", name: "AddDepartment", element: EditDep },
  { path: "/students", name: "Students", element: students },
];
export default routes;
