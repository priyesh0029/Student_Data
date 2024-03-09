import { Slider, Typography } from "@material-tailwind/react";
import { useState } from "react";




const GradeSlider = ({formikValue,handleSliderChange})=> {
    const [value, setValue] = useState(formikValue); 

    const handleChange = (event) => {
      setValue(parseInt(event.target.value)); 
      handleSliderChange(parseInt(event.target.value))
    };
  
    const calculateGradient = () => {
      const percentage = ((value - 1) / 9) * 100;
      return `linear-gradient(to right, #007BFF 0%, #007BFF ${percentage}%, #E0E0E0 ${percentage}%, #E0E0E0 100%)`;
    };
  
    return (
     <div className="my-2">
     <p className="text-md">Grade</p>
      <div className="w-full relative flex justify-between items-center">
        <div className="flex items-center w-full">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={value}
            onChange={handleChange}
            className="slider w-full h-2 appearance-none rounded-md outline-none"
            style={{ background: calculateGradient() }}
          />
          <div className="ml-2">{value}</div>
        </div>
      </div>
     </div>
    );
}

export default GradeSlider