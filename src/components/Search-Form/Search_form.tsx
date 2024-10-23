import * as React from "react";
import "./Search_form.css";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export const Search_form = (props: SimpleDialogProps) => {
  const { handleSubmit } = useForm();
  const onSubmit = (d: any) => alert(JSON.stringify(d));
  const [age, setAge] = useState<number>(14);
  const [availability, setAvailability] = useState<string>("8.00 AM");
  // const [areaRange, setAreaRange] = useState<string>("");

  return (
    <>
      <div className="all">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex-container1">
              <label>Gender: </label>
              <input type="radio" name="gender" value="Male" /> Male
              <input type="radio" name="gender" value="Female" /> Female
            </div>
            <div className="flex-container1">
              <label>Age: </label>
              <input
                type="range"
                min="14"
                max="60"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              {age} years
            </div>
            <div className="flex-container1">
              <label>Language: </label>
              <input type="checkbox" name="language" value="Bengali" /> Bengali
              <input type="checkbox" name="language" value="Hindi" /> Hindi
              <input type="checkbox" name="language" value="English" /> English
            </div>
            <div className="flex-container1">
              <label>Shift Time: </label>
              <input type="radio" name="shift" value="Morning" /> Morning
              <input type="radio" name="shift" value="Evening" /> Evening
            </div>
            <div className="flex-container1">
              <label>Availability: </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="8.00 AM">8.00 AM</option>
              </select>
            </div>
            {/* <div className="flex-container1">
              <label>Category: </label>
              <input
                type="checkbox"
                name="category"
                value="Economy Service"
              />{" "}
              Economy Service
              <input
                type="checkbox"
                name="category"
                value="Premium Service"
              />{" "}
              Premium Service
            </div> */}
            <div className="flex-container1">
              <label>Speciality: </label>
              <input type="radio" name="speciality" value="veg" /> Veg
              <input type="radio" name="speciality" value="Non-Veg" /> Non-Veg
            </div>
            <div className="flex-container1">
              <label>Customer Ratings: </label>
              <input type="checkbox" name="rating" value="5" /> 5 ★
              <input type="checkbox" name="rating" value="4" /> 4 ★ & above
              <input type="checkbox" name="rating" value="3" /> 3 ★ & above
            </div>
            {/* <div className="flex-container1">
              <label>Area Range: </label>
              <input
                type="radio"
                name="area"
                value="1-2 Km"
                onChange={() => setAreaRange("1-2 Km")}
              />{" "}
              Within 1-2 Km Area
              <input
                type="radio"
                name="area"
                value="2-5 Km"
                onChange={() => setAreaRange("2-5 Km")}
              />{" "}
              Within 2-5 Km Area
              <input
                type="radio"
                name="area"
                value="5-10 Km"
                onChange={() => setAreaRange("5-10 Km")}
              />{" "}
              Within 5-10 Km Area
            </div> */}
            <div className="button">
              <div className="Sbtn1">
                <Button type="submit" id="button1" variant="outline-dark">
                  Submit
                </Button>
              </div>
              <div className="Sbtn2 ">
                <Button type="reset" id="button2" variant="outline-dark">
                  {" "}
                  Reset{" "}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search_form;
