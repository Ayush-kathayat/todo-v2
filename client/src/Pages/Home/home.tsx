import { useLocation } from "react-router-dom";
import Nav from "../../components/Nav/nav";

import "./home.css";

import TaskWrapper from "../../components/TaskWrapper/task-wrapper";

import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  // const navigate = useNavigate();

  // const [task, setTask] = useState<Task[]>([]);
  const location = useLocation();
  const user = location.state.data;
  console.log(user);

  return (
    <div className="home-wrapper">
      <Nav username={user.name} />
      <TaskWrapper />
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Home;
