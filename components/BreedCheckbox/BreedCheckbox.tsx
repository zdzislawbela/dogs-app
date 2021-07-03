import React, { ChangeEvent } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import style from "./BreedCheckbox.module.css";
import { formatBreed } from "../helpers/formatBreed";

type Props = {
  breed: string;
  handleCheckbox: (option: string) => void;
  isChecked: boolean;
};

export const BreedCheckbox = ({ breed, handleCheckbox, isChecked }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleCheckbox(event.target.value);
  };

  return (
    <div className={style.breedCheckbox}>
      <FormControl component='fieldset'>
        <FormGroup aria-label='position' row>
          <div className={style.breedCheckboxLabel}>
            <FormControlLabel
              value={breed}
              control={<Checkbox color='primary' onChange={handleChange} />}
              label={formatBreed(breed)}
              labelPlacement='end'
              checked={isChecked}
            />
          </div>
        </FormGroup>
      </FormControl>
    </div>
  );
};
