// import axios from "../api/axios";
import { useEffect, useState } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  //   const refresh = useRefreshToken();
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        // const respone = await axios.get("/users", {
        const respone = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(respone.data);
        isMounted && setUsers(respone.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      AbortController.abort();
    };
  }, []);

  return (
    <article>
      <h2>User List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      {/* <button onClick={()=> refresh()}>Refresh</button>
      <br /> */}
    </article>
  );
};

export default Users;
