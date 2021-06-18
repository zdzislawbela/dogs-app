import React, { ChangeEvent, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

type Props = {
  breed: string;
  handleCheckbox: (option: string) => void;
  isChecked: boolean;
};

export const BreedCheckbox = ({ breed, handleCheckbox, isChecked }: Props) => {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleCheckbox(event.target.value);
  };

  return (
    <FormControl component='fieldset'>
      <FormGroup aria-label='position' row>
        <FormControlLabel
          value={breed}
          control={<Checkbox color='primary' onChange={handleChange} />}
          label={breed}
          labelPlacement='end'
          checked={isChecked}
        />
      </FormGroup>
    </FormControl>
  );
};
