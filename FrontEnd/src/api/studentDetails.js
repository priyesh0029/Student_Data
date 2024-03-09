import baseURL from "./apiInterceptor";


 export const addStudent = async(studentData)=>{
    console.log("submitHandler : ",studentData);
    try {
        const response = await baseURL.post(
          "/add",
          studentData
        );
    
        console.log("response first : ", response);
        if(response.data.status === 'OK'){
          return response
        }
        
      } catch (error) {
       console.log(error);
      }
}

export const getAllStudentDetails = async()=>{
  try {
    const response = await baseURL.get('/allstudents')
    console.log("response all students : ", response);
    if(response.data.status === 'OK'){
      return response
    }
  } catch (error) {
    console.log(error);
  }
}

export const saveEditStudent = async(updatedInfo)=>{
  try {
    const response = await baseURL.put('/editStudent',updatedInfo)
    console.log("response all students : ", response);
    if(response.data.status === 'OK'){
      return response
    }
  } catch (error) {
    console.log(error);
  }
}

export const deleteStudent = async(id)=>{
  try {
    console.log("response all students : ", id);
    const response = await baseURL.delete('/deleteStudent',{ data: { id } })
    console.log("response all students : ", response);
    if(response.data.status === 'OK'){
      return response
    }
  } catch (error) {
    console.log(error);
  }
}