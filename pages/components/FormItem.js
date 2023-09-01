import { Form, FormGroup, Alert } from "react-bootstrap";
import { useState } from "react";

export default function FormItemDefault() {}


export const FormItem =  ({ item, onChange, onBlur, answer, isRequiredError})  => {
  const [currentValue, setCurrentValue] = useState(answer || '');
  const [currentSelection, setCurrentSelection] = useState(answer || '');

  const handleValueChange = (value) => {
    setCurrentValue(value);
    onChange(value, item.value);
  }

  const handleSelectionChange = (value) => {
    setCurrentSelection(value);
    onChange(value, item.value);
  }

   switch (item.type) {
      case 'text':
        return (
          <FormGroup key={item.label} className="form-container">
            <Form.Label 
                className="block text-sm font-medium leading-6 text-gray-900">
                    {item.label}
            </Form.Label>
            <Form.Control
              className="input-box"
              style={{padding: "5px"}}
              type="text"
              id={item.label}
              onChange={(e) => handleValueChange(e.target.value, item.value)}
              onBlur={(e) => onBlur()}
              value={currentValue}
            />
            {isRequiredError && (
              <p className="text-red-500 text-sm mt-1">This field is required.</p>
            )}
          </FormGroup>   
      )
        break;
      case 'select':
        return (
          <FormGroup key={item.label} className="mt-2 form-container">
            <Form.Label 
                className="block text-sm font-medium leading-6 text-gray-900" 
                htmlFor="inputPassword5">
                    {item.label}
            </Form.Label>
            <Form.Select 
                className="dropdown-box"
                aria-label={item.label} 
                onBlur={(e) => onBlur()}
                onChange={(e) => handleSelectionChange(e.target.value, item.value)}
                value={currentSelection}>
                <option value=""/>
                {
                    item.options.map((opt, index) => {
                    return (
                        <option key={index} value={opt}>{opt}</option>
                    )
                    })
                }
            </Form.Select>
            {isRequiredError && (
              <p className="text-red-500 text-sm mt-1">This field is required.</p>
            )}
          </FormGroup>
      )
        break;
      case 'information':
        return (
          <Alert className="information-item">
            {item.value}
          </Alert>
      )
    }
  };