import React, { useState } from "react";
import "./Search_form.css";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import axiosInstance from "../../services/axiosInstance";
import axios from "axios";
import ChipInput from "../Common/ChipInput/ChipInput";
interface SearchFormProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
  onSearch: (data: any[]) => void;
}

interface FormData {
  gender: string;
  age: number;
  language: string[];
  shift: string;
  availability: string;
  cookingspeciality: string;
  diet: string;
  rating: string[];
  speciality: string[];
}

export const Search_form: React.FC<SearchFormProps> = ({
  open,
  selectedValue,
  onClose,
  onSearch,
}) => {
  const { handleSubmit, control, register, reset, watch, setValue } =
    useForm<FormData>({
      defaultValues: {
        gender: "",
        age: 18,
        language: [],
        shift: "",
        availability: "8.00 AM, 12.00 PM",
        cookingspeciality: "",
        diet: "",
        speciality: [],
        rating: [],
      },
    });
  const [foodSpecialityModalVisible, setFoodSpecialityModalVisible] =
    useState(false);
  const [foodSpecialitySearch, setFoodSpecialitySearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [availableLanguages] = useState<string[]>([
    "Assamese",
    "Bengali",
    "Gujarati",
    "HINDI",
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
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChipChange = (newChips: string[]) => {
    setSelectedChips(newChips);
    console.log(selectedChips)
  };

  const [availableFoodSpecialities] = useState<string[]>([
    "CHINESE",
    "Butter Chicken",
    "Rogan Josh",
    "Chole Bhature",
    "Dal Makhani",
    "Paneer Tikka",
    "Aloo Paratha",
    "Tandoori Chicken",
    "Kadhi Pakora",
    "Rajma-Chawal",
    "Pindi Chana",
    "Masala Dosa",
    "Idli-Sambar",
    "Vada",
    "Hyderabadi Biryani",
    "Pongal",
    "Appam with Stew",
    "Chettinad Chicken",
    "Puliyodarai",
    "Malabar Parotta",
    "Puttu and Kadala Curry",
    "Macher Jhol",
    "Litti Chokha",
    "Pakhala Bhata",
    "Sandesh",
    "Chingri Malai Curry",
    "Rosogolla",
    "Momos",
    "Thukpa",
    "Aloo Pitika",
    "Bamboo Shoot Curry",
    "Pav Bhaji",
    "Dhokla",
    "Thepla",
    "Dal Baati Churma",
    "Gatte Ki Sabzi",
    "Goan Fish Curry",
    "Puran Poli",
    "Shrikhand",
    "Laal Maas",
    "Handvo",
    "Pani Puri/Golgappa",
    "Samosa",
    "Kachori",
    "Sev Puri",
    "Aloo Tikki Chaat",
    "Jalebi",
    "Bhutta (Roasted Corn)",
    "Chaat Papdi",
    "Dabeli",
  ]);

  const toggleFoodSpecialitySelection = (speciality: string) => {
    const selectedSpecialities = watch("speciality");
    if (selectedSpecialities.includes(speciality)) {
      setValue(
        "speciality",
        selectedSpecialities.filter((item) => item !== speciality)
      );
    } else {
      setValue("speciality", [...selectedSpecialities, speciality]);
    }
  };
  const filteredFoodSpecialities = availableFoodSpecialities.filter(
    (speciality) =>
      speciality.toLowerCase().includes(foodSpecialitySearch.toLowerCase())
  );

  const handleFoodSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFoodSpecialitySearch(event.target.value);
  };

  const toggleLanguageSelection = (language: string) => {
    const selectedLanguages = watch("language");
    if (selectedLanguages.includes(language)) {
      setValue(
        "language",
        selectedLanguages.filter((item) => item !== language)
      );
    } else {
      setValue("language", [...selectedLanguages, language]);
    }
  };

 
  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
  
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/api/serviceproviders/get-by-filters",
      );
  
      onSearch(response.data); // Pass the response data to the onSearch callback
    } catch (err) {
      console.error("There was a problem with the fetch operation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="all">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Gender selection */}
          <div className="flex-container1">
            <div className="gender">
              <label>Gender: </label>
              <input type="radio" value="MALE" {...register("gender")} /> Male
              <input type="radio" value="FEMALE" {...register("gender")} />{" "}
              Female
            </div>
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
{/* {To be used by Subhrajit for chip input}  */}
      <ChipInput options={availableLanguages} onChange={handleChipChange} label="languages" placeholder="Pick/Type Your Languages" />
            {/* <Button
              variant="outline-primary"
              onClick={() => setLanguageModalVisible(true)}
            >
              {watch("languages").length > 0
                ? watch("languages").join(", ")
                : "Pick Language"}
            </Button>
            {languageModalVisible && (
              <div className="modal">
                <div className="modal-content">
                  <ul className="language-list">
                    <Button
                      variant="outline-primary"
                      onClick={() => setLanguageModalVisible(false)}
                    >
                      Close
                    </Button>
                    {availableLanguages.map((language) => (
                      <li
                        key={language}
                        className={`language-item ${
                          watch("languages").includes(language)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => toggleLanguageSelection(language)}
                      >
                        {language}
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            )} */}
          </div>
          <div className="language">
          <ChipInput options={availableFoodSpecialities} onChange={handleChipChange} label="Pick Food" placeholder="Pick/Type Your Food Speciality" />
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

          {/* Submit and Reset buttons */}
          <div className="button">
            <Button type="submit" id="button1" variant="outline-primary">
              Search
            </Button>
            <Button
              type="button"
              id="button2"
              variant="outline-primary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Search_form;
