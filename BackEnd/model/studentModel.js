import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const Student = sequelize.define('Student', {
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Model synchronized with database.');

        const isTableExists = await Student.findAll({ limit: 1 });
        if (!isTableExists.length) {
            await Student.sync();
            console.log('Table created successfully.');
        } else {
            console.log('Table already exists.');
        }
    } catch (error) {
        console.error('Error synchronizing model or creating table:', error);
    }
})();

export default Student
