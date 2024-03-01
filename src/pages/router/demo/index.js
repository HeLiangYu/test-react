import { Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "../matchPath";
import "./createRouter";

function Page1() {
  const match = useParams();
  return <div>page1</div>;
}

function Page2() {
  return <div>page2</div>;
}
export default function RouterDemo() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/page1">page1</Link>
        <Link to="/page2">page2</Link>
      </div>

      <div>
        <Routes>
          <Route path="/page1/:id" element={<Page1 />}></Route>
          <Route path="/page2" element={<Page2 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
