import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter, useRoutes } from "react-router-dom";
import "../matchPath";
import "../history";

import {
  BrowserRouter as MyBrowserRouter,
  Route as MyRoute,
  Routes as MyRoutes,
  Link as MyLink,
} from "../router";

function Page1() {
  return <div>page1</div>;
}

function Page2() {
  return <div>page2</div>;
}
export default function RouterDemo() {
  // let element = useRoutes([
  //   {
  //     path: "/",
  //     element: <div>1</div>,
  //     children: [
  //       {
  //         path: "messages",
  //         element: <div>21</div>,
  //       },
  //       { path: "tasks", element: <div>3</div> },
  //     ],
  //   },
  //   { path: "team", element: <div>4</div> },
  // ]);

  // console.log(element);

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <BrowserRouter>
          <div>
            <Link to="/page1">page1</Link>
            <Link to="/page2">page2</Link>
            <Link to="/page2/jdkkd">jdkkd</Link>
          </div>

          <div>
            <Routes>
              <Route path="/page1" element={<Page1 />}></Route>
              <Route path="/page2" element={<Page2 />}></Route>
              <Route
                path="/page2/jdkkd"
                element={<div>/page2/jdkkd</div>}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      <div>
        <MyBrowserRouter>
          <div>
            <MyLink to="/page1">page1</MyLink>
            <MyLink to="/page2">page2</MyLink>
            <MyLink to="/page2/pae" replace>
              jdkkd
            </MyLink>
          </div>

          <MyRoutes>
            <MyRoute path="/page1" element={<Page1 />}></MyRoute>
            <MyRoute path="/page2" exact element={<Page2 />}></MyRoute>
            <MyRoute
              path="/page2/pae"
              element={<div>/page2/pae</div>}
            ></MyRoute>
          </MyRoutes>
        </MyBrowserRouter>
      </div>
    </div>
  );
}
