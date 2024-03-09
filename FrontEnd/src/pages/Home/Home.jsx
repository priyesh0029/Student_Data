import StudentList from "../../components/studentDetails/StudentList";
import StudentForm from "../../components/studentForm/StudentForm";

const Home = () => {
  return (
    <div className="flex w-full flex-col bg-gray-100">
      <div className="">
        <StudentForm />
      </div>
      <div className="">
        <StudentList />
      </div>
    </div>
  );
};

export default Home;
