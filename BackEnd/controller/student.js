import Student from "../model/studentModel.js";

const addStudent = (async(req,res)=>{
    console.log(req.body);
    try {
        const { fname, lname, dob, grade, gender } = req.body;
        const newStudent = await Student.create({ fname, lname, dob, grade, gender });
        console.log("newStudent after creation : ", newStudent);
        res.status(201).json({newStudent,status : "OK"});
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).send('Error creating student');
    }
})

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json({students,status:"OK"});
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Error fetching students');
    }
};

const editStudent = async (req, res) => {
    const { id,fname, lname, dob, grade, gender } = req.body; 
        console.log("editStudent : ",req.body);
    try {
        const existingStudent = await Student.findByPk(id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await Student.update(
            { fname, lname, dob, grade, gender },
            { where: { id } }
        );
        const updatedStudent = await Student.findByPk(id);

        res.status(200).json({updatedStudent,status : "OK"});
    } catch (error) {
        console.error('Error editing student:', error);
        res.status(500).send('Error editing student');
    }
};


const deleteStudent = async (req, res) => {
    console.log("deleteStudent: ",req.body);
    const { id } = req.body;

    try {
        const existingStudent = await Student.findByPk(id);
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        await Student.destroy({ where: { id } });
        res.status(200).json({ message: 'Student deleted successfully',status :"OK" });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).send('Error deleting student');
    }
};


export default{
    addStudent,
    getAllStudents,
    editStudent,
    deleteStudent
}