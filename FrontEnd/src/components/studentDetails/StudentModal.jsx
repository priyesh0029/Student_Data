import React, { useEffect, useState } from "react";
import { Button, Dialog, Chip, Input, Radio } from "@material-tailwind/react";
import GradeSlider from "../studentForm/GradeSlider";
import { deleteStudent, saveEditStudent } from "../../api/studentDetails";
import { useData } from "../../contexts/DataContexts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentModal = ({ open, setOpen, studentInfo }) => {
  const { data, updateData } = useData();

  const [edit, setEdit] = useState(false);
  const [fname, setFname] = useState(studentInfo.fname);
  const [lname, setLname] = useState(studentInfo.lname);
  const [dob, setDob] = useState(studentInfo.dob);
  const [grade, setGrade] = useState(studentInfo.grade);
  const [gender, setGender] = useState(studentInfo.gender);
  const [id, setId] = useState(studentInfo.id);

  useEffect(() => {
    setId(studentInfo.id);
    setFname(studentInfo.fname);
    setLname(studentInfo.lname);
    setDob(studentInfo.dob);
    setGrade(studentInfo.grade);
    setGender(studentInfo.gender);
  }, [studentInfo]);

  const handleOpen = () => setOpen(!open);
  const handleEdit = () => setEdit(true);
  const handleSliderChange = (value) => {
    setGrade(value);
  };
  const handleSaveEdit = async () => {
    const updatedInfo = { id, fname, lname, dob, grade, gender };
    const response = await saveEditStudent(updatedInfo);
    if (response.data.status === "OK") {
      updateStudentDetails(response.data.updatedStudent);
      toast.success("successfully edited");
      setEdit(false);
      handleOpen();
    }
  };

  const updateStudentDetails = (updatedStudent) => {
    const updatedData = data.map((student) => {
      if (student.id === updatedStudent.id) {
        return updatedStudent;
      }
      return student;
    });

    updateData(updatedData);
  };
  const handleDelete = async () => {
    console.log(id);
    const result = await deleteStudent(id);
    if (result.data.status === "OK") {
      removeStudentDetails(id);
      toast.success(result.data.message);
      handleOpen();
    }
  };
  const removeStudentDetails = (id) => {
    const updatedData = data.filter((student) => student.id !== id);

    updateData(updatedData);
  };

  const today = new Date().toISOString().split("T")[0];
  const allGenders = ["Male", "Female", "Others"];

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <p className="text-center text-4xl font-bold my-4 text-black font-cursive">
          Student Details
        </p>
        <div className="flex justify-end gap-2 mr-6 mt-12">
          <span onClick={handleEdit}>
            {" "}
            <Chip variant="ghost" size="sm" value="Edit" />
          </span>
          {!edit ? (
            <div onClick={handleDelete}>
              <Chip variant="ghost" size="sm" value="Delete" />
            </div>
          ) : (
            <div onClick={handleSaveEdit}>
              <Chip color="green" size="sm" value="Save" />
            </div>
          )}
        </div>
        {!edit ? (
          <div className="p-10">
            <div className="flex flex-col gap-4 px-10">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Name </p>
                <p className="text-lg font-semibold text-start">
                  {fname + " " + lname}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-semibold text-start">
                  Date of Birth{" "}
                </p>
                <p className="text-lg font-semibold text-start">{dob}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-semibold">Grade </p>
                <p className="text-lg font-semibold text-start">{grade}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-lg font-semibold">Gender </p>
                <p className="text-lg font-semibold text-start">{gender}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-1">
                <div>
                  <Input
                    type="text"
                    id="fname"
                    size="lg"
                    label="First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <div className="w-100">
                  <Input
                    type="text"
                    id="lname"
                    size="lg"
                    label="Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>

              <Input
                type="date"
                id="dob"
                size="lg"
                label="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                max={today}
              />

              <GradeSlider
                formikValue={grade}
                handleSliderChange={handleSliderChange}
              />
              <div className="flex flex-col my-4">
                <p className="text-md">Gender</p>
                <div>
                  {allGenders.map((eachGender) => (
                    <Radio
                      name="gender"
                      label={eachGender}
                      ripple={false}
                      onChange={() => {
                        setGender(eachGender);
                      }}
                      checked={eachGender === gender}
                      key={eachGender}
                      className="hover-ripple"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default StudentModal;
