import React, { useEffect, useState } from "react";
import { Card, Chip, Typography } from "@material-tailwind/react";
import { deleteStudent, getAllStudentDetails } from "../../api/studentDetails";
import { useData } from "../../contexts/DataContexts";
import StudentModal from "./StudentModal";
import { ToastContainer } from "react-toastify";


const TABLE_HEAD = ["Id", "Name", "Date of Birth", "Grade", "Gender"];

const StudentList = () => {

  const { data, updateData } =  useData();
  const [studentInfo, setstudentInfo] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllStudentDetails();
        console.log("result after effect : ",result.data.students);
        if(result.data.status === "OK"){
          updateData(result.data.students)
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewStudentsData = (data)=>{
    console.log("handleViewStudentsData : ",data);
    setstudentInfo(data)
    setOpen(!open)
  }



  return (
    <div className="border-gray-400  border-2 shadow-xl rounded-xl flex flex-col items-center mb-20 justify-center p-10">
      <p className="text-3xl font-bold font-cursive text-black text-center my-8">
        Student Details
      </p>
      {/* <ToastContainer position="bottom-left" /> */}

      <Card className="h-full w-full overflow-hidden mb-10">
        {" "}
        <div className="overflow-scroll">
          {" "}
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ id,fname,lname,dob,grade,gender }, index) => {
                 const studentData = { id, fname, lname, dob, grade, gender };
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id} onClick={()=>handleViewStudentsData(studentData)}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {fname+" "+lname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {dob}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {grade}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {gender}
                      </Typography>
                    </td>

                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <StudentModal open={open} setOpen ={setOpen} studentInfo={studentInfo}/>
    </div>
  );
};

export default StudentList;
