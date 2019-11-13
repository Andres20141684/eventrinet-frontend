import React from "react";
import Form from 'react-bootstrap/Form'
const RadioButton = ({isSelected, onRadioButtonChange }) => (
  <div class="form-group col-md-6">                    
  <div>
      <Form.Check
          type="radio" inline
          checked={isSelected}//estado presionado o no
          label="Si"//nombre
          //name="formHorizontalRadios_1"
          //id="rdCategry"
          onClick={onRadioButtonChange}//cambiar el estado
      />
      <Form.Check
          type="radio" inline
          checked={isSelected}
          label="Quizás"
          //name="formHorizontalRadios_1"
          //id="rdPropuest"
          onClick={onRadioButtonChange}
      />
      <Form.Check
          type="radio" inline
          checked={isSelected}
          label="No"
          //name="formHorizontalRadios_1"
          //id="rdPropuest"
          onClick={onRadioButtonChange}
      />
      <Form.Check
          type="radio" inline
          checked={isSelected}
          label="Conflicto"
          //name="formHorizontalRadios_1"
          //id="rdPropuest"
          onClick={onRadioButtonChange}
      />
  </div>
</div>
);

export default RadioButton;