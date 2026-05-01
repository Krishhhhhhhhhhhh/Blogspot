import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/api";
import { Button } from "./Button";

export const AppBar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/signin");
  };

  return (
    <div className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/blogs" className="text-2xl font-bold text-blue-600">
          MyBlog
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/publish">
                <Button variant="primary" size="sm">
                  Write
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
