import * as React from "react";
import "./Search_form.css";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Chip, TextField, Autocomplete } from "@mui/material";
import axios from "axios";

interface SearchFormProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
}

interface Country {
  languages?: { [key: string]: string };
}

interface FormData {
  gender: string;
  age: number;
  languages: string[];
  shift: string;
  availability: string;
  speciality: string;
  diet: string;
  rating: string[];
}

export const Search_form: React.FC<SearchFormProps> = ({
  open,
  selectedValue,
  onClose,
}) => {
  const { handleSubmit, control, register, reset, watch } = useForm<FormData>({
    defaultValues: {
      gender: "",
      age: 18,
      languages: [],
      shift: "",
      availability: "8.00 AM",
      speciality: "",
      diet: "",
      rating: [],
    },
  });

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([
    "Assamese",
    "Bengali",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Marathi",
    "Malayalam",
    "Oriya",
    "Punjabi",
    "Sanskrit",
    "Tamil",
    "Telugu",
    "Urdu",
    "Sindhi",
    "Konkani",
    "Nepali",
    "Manipuri",
    "Bodo",
    "Dogri",
    "Maithili",
    "Santhali",
  ]);

  // Fetch worldwide languages and add them to the availableLanguages array
  useEffect(() => {
    const fetchWorldLanguages = async () => {
      try {
        const response = await axios.get<Country[]>(
          "https://restcountries.com/v3.1/all"
        );
        const worldLanguagesSet = new Set<string>();

        response.data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((language) =>
              worldLanguagesSet.add(language)
            );
          }
        });

        setAvailableLanguages((prevLanguages) => [
          ...prevLanguages,
          ...Array.from(worldLanguagesSet),
        ]);
      } catch (error) {
        console.error("Error fetching world languages:", error);
      }
    };

    fetchWorldLanguages();
  }, []);

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  // Handle reset
  const handleReset = () => {
    reset();
  };

  return (
    <>
      <div className="all">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* Gender selection */}
            <div className="flex-container1">
              <label>Gender: </label>
              <input type="radio" value="Male" {...register("gender")} /> Male
              <input type="radio" value="Female" {...register("gender")} />{" "}
              Female
            </div>

            {/* Age slider */}
            <div className="flex-container1">
              <label>Age: </label>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <input
                    type="range"
                    min="18"
                    max="50"
                    {...field}
                    value={field.value}
                  />
                )}
              />
              {watch("age")} years
            </div>

            {/* Language selection */}
            <div className="language">
              <h6>Select Languages (Indian and World Languages)</h6>
              <Controller
                name="languages"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={availableLanguages}
                    value={field.value}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          // key = {index}
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Languages"
                      />
                    )}
                  />
                )}
              />
            </div>

            {/* Shift time */}
            <div className="flex-container1">
              <label>Shift Time: </label>
              <input type="radio" value="Morning" {...register("shift")} />{" "}
              Morning
              <input type="radio" value="Afternoon" {...register("shift")} />{" "}
              Afternoon
              <input type="radio" value="Evening" {...register("shift")} />{" "}
              Evening
            </div>

            {/* Availability */}
            <div className="flex-container1">
              <label>Availability: </label>
              <select {...register("availability")}>
                <option value="8.00 AM">8.00 AM</option>
                <option value="12.00 PM">12.00 PM</option>
                <option value="4.00 PM">4.00 PM</option>
              </select>
            </div>

            {/* New Diet section with symbols */}
            <div className="flex-container1">
              <label>Diet: </label>
              <input type="radio" value="Veg" {...register("diet")} />
              <img
                src="veg.png"
                alt="Vegetarian Diet Symbol"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
              <input type="radio" value="Non-Veg" {...register("diet")} />
              <img
                src="nonveg.png"
                alt="Vegetarian Diet Symbol"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </div>

            {/* Speciality section */}
            <div className="flex-container1">
              <label>Cooking Speciality: </label>
              <input type="radio" value="Veg" {...register("diet")} />
              <img
                src="veg.png"
                alt="Vegetarian Diet Symbol"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
              <input type="radio" value="Non-Veg" {...register("diet")} />
              <img
                src="nonveg.png"
                alt="Vegetarian Diet Symbol"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </div>

            

            {/* Ratings */}
            <div className="flex-container1">
              <label>Customer Ratings: </label>
              <input type="checkbox" value="5" {...register("rating")} />
              <span style={{ color: "#FFD700" }}>★</span> 5
              <input type="checkbox" value="4" {...register("rating")} />
              <span style={{ color: "#FFD700" }}>★</span> 4 & above
              <input type="checkbox" value="3" {...register("rating")} />
              <span style={{ color: "#FFD700" }}>★</span> 3 & above
            </div>

            {/* Submit and Reset buttons */}
            <div className="button">
              <div className="Sbtn1">
                <Button type="submit" id="button1" variant="outline-primary">
                  Submit
                </Button>
              </div>
              <div className="Sbtn2">
                <Button
                  type="button"
                  id="button2"
                  variant="outline-primary"
                  onClick={handleReset}
                >
                  Reset
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
