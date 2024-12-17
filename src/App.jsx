import "./App.css";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Private from "./components/Private/Private";
import Page404 from "./components/Page404";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader/Loader";
const Profile = lazy(() => import("./pages/Profile/Profile"));
const ForgotPassword = lazy(() =>
  import("./pages/Auth/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./pages/Auth/ResetPassword/ResetPassword")
);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/:id/reset-password" element={<ResetPassword />} />

          <Route element={<Private />}>
            <Route
              path="/u/profile"
              element={
                <Suspense fallback={<Loader />}>
                  <Profile />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
