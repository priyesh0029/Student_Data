import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Input, Button, Typography, Radio } from "@material-tailwind/react";
import GradeSlider from "./GradeSlider";
import { addStudent } from "../../api/studentDetails";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "../../contexts/DataContexts";

const StudentForm = () => {
  const { data, updateData } = useData()

  const submitHandler = async (studentData) => {
    let response = await addStudent(studentData);
    if (response.data.status === "OK") {
      const newStudent = response.data.newStudent
      console.log("newStudent : ", newStudent);
      updateData([newStudent,...data])
      toast.success("Registation successfull");
    } 
  };

  const allGenders = ["Male", "Female", "Others"];
  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      dob: "",
      grade: "5",
      gender: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      lname: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      dob: Yup.string().required("*Required"),
      gender: Yup.string().required("*Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values indside formik : ", values);
      submitHandler(values);
      setSubmitting(false);
    },
  });

  const handleSliderChange = (value) => {
    formik.setFieldValue("grade", value);
  };

  return (
    <div className="flex justify-center ">
          <ToastContainer position="bottom-left" />
      <div className="flex w-100 my-16 pt-8 items-center justify-center flex-col border-2 border-gray-400 rounded-xl bg-gray-200 shadow-md">
        <div>
          <div className="flex justify-center gap-2">
            <div className="flex items-center">
              <p className="text-3xl font-bold font-cursive text-black">
                Register Student
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <form
            onSubmit={formik.handleSubmit}
            className=" ml-auto mr-auto 2 w-100 "
          >
            <div className="p-4">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div>
                    <Input
                      type="text"
                      id="fname"
                      size="lg"
                      label="First Name"
                      {...formik.getFieldProps("fname")}
                    />
                    <p className="h-6 ml-2 text-xs text-red-800">
                      {formik.touched.fname && formik.errors.fname
                        ? formik.errors.fname
                        : null}
                    </p>
                  </div>

                  <div className="w-100">
                    <Input
                      type="text"
                      id="lname"
                      size="lg"
                      label="Last Name"
                      {...formik.getFieldProps("lname")}
                    />
                    <p className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.lname && formik.errors.lname
                        ? formik.errors.lname
                        : null}
                    </p>
                  </div>
                </div>

                <Input
                  type="date"
                  id="dob"
                  size="lg"
                  label="Date of Birth"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  {...formik.getFieldProps("dob")}
                  max={today}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : null}
                </p>

                <GradeSlider
                  formikValue={formik.values.grade}
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
                          formik.setFieldValue("gender", eachGender);
                        }}
                        checked={eachGender === formik.values.gender}
                        key={eachGender}
                        className="hover-ripple"
                      />
                    ))}
                  </div>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className="text-red-500">{formik.errors.gender}</p>
                  )}
                </div>
              </div>

              <div className="flex w-24 ml-44">
                <Button
                  type="submit"
                  className="mt-2"
                  color="blue"
                  variant="gradient"
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
