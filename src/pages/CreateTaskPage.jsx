import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { PageWrapper } from "../components/ui";

const CreateTaskPage = () => {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <h2 style={{ marginBottom: "1rem" }}>Create Task</h2>
        <TaskForm />
      </PageWrapper>
    </>
  );
};

export default CreateTaskPage;
