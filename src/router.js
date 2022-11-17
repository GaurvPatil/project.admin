import Dashboard from "./pages/Dashboard";

import ProjectGuide from "./pages/ProjectGuide";
import AddGuide from "./components/GuideComponents/AddGuide";

import students from "./pages/students";

import Departments from "./pages/Departments";
import AddDep from "./components/DepComponetns/AddDep";
import EditDep from "./components/DepComponetns/EditDep";
import EditGuide from "./components/GuideComponents/EditGuide";

const routes = [
  { path: "/dashboard", name: "Home", element: Dashboard, exact: true },

  // guide
  { path: "/projectguides", name: "Project Guide", element: ProjectGuide },
  { path: "/projectguide/add", name: "AddProjectGuide", element: AddGuide },
  {
    path: "/projectguide/edit/:id",
    name: "EditProjectGuide",
    element: EditGuide,
  },

  // department
  { path: "/departments", name: "Departments", element: Departments },
  { path: "/department/add", name: "AddDepartment", element: AddDep },
  { path: "/department/edit/:id", name: "AddDepartment", element: EditDep },
  { path: "/students", name: "Students", element: students },
];
export default routes;
