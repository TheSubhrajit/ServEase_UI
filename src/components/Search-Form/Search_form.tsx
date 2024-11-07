import * as React from "react";
import "./Search_form.css";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Chip, TextField, Autocomplete, Box } from "@mui/material";
// import axios from "axios";
import axiosInstance from '../../services/axiosInstance';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface SearchFormProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
  onSearch: (data: any[]) => void; // New prop for sending search results
}

interface FormData {
  gender: string;
  age: number;
  languages: string[];
  shift: string;
  availability: string;
  cookingspeciality: string;
  diet: string;
  rating: string[];
}

export const Search_form: React.FC<SearchFormProps> = ({
  open,
  selectedValue,
  onClose,
  onSearch,
}) => {
  const { handleSubmit, control, register, reset, watch } = useForm<FormData>({
    defaultValues: {
      gender: "",
      age: 18,
      languages: [],
      shift: "",
      availability: "8.00 AM, 12.00 pM",
      cookingspeciality: "",
      diet: "",
      rating: [],
    },
  });
  const [loading, setLoading] = useState(false);

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
  // useEffect(() => {
  //   const fetchWorldLanguages = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://restcountries.com/v3.1/all"
  //       );
  //       const worldLanguagesSet = new Set<string>();

  //       response.data.forEach((country) => {
  //         if (country.languages) {
  //           Object.values(country.languages).forEach((language) =>
  //             worldLanguagesSet.add(language)
  //           );
  //         }
  //       });

  //       setAvailableLanguages((prevLanguages) => [
  //         ...prevLanguages,
  //         ...Array.from(worldLanguagesSet),
  //       ]);
  //     } catch (error) {
  //       console.error("Error fetching world languages:", error);
  //     }
  //   };

  //   fetchWorldLanguages();
  // }, []);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);

    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/serviceproviders/serviceproviders/all'); // Change this to use form data as parameters if needed
      onSearch(response.data); // Send data back to DetailsView
    } catch (err) {
      console.error("There was a problem with the fetch operation:", err);
    }finally {
      setLoading(false);
    }
  };

  return (
    // <>
    // {loading ? (
    //   <Box sx={{ display: 'flex' }}>
    //     <LoadingIndicator />
    //   </Box>
    // ) : (
     <div className="all">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* form fields... */}
        
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
                          // key={index}
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
              <input type="radio" value="Veg" {...register("cookingspeciality")} />
              <img
                src="veg.png"
                alt="Vegetarian Diet Symbol"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
              <input type="radio" value="Non-Veg" {...register("cookingspeciality")} />
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
              Search
            </Button>
          </div>
          <div className="Sbtn2">
            <Button
              type="button"
              id="button2"
              variant="outline-primary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  // )}
  // </>
  );
};

export default Search_form;
