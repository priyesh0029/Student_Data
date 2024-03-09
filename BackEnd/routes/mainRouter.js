
import studentController from "../controller/student.js"

const mainRouter = (express)=>{
    const router = express.Router()

    router.post('/add',studentController.addStudent)
    router.get('/allstudents',studentController.getAllStudents)
    router.put('/editStudent',studentController.editStudent)
    router.delete('/deleteStudent',studentController.deleteStudent)
    
    return router
}

export default mainRouter