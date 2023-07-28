import { Form, FormGroup } from "react-bootstrap";
import { useState } from "react";

export default function FormItemDefault() {}


export const FormItem =  ({ item, onChange, onBlur, answer })  => {
  const [currentValue, setCurrentValue] = useState(answer || '');

  const handleChange = (value) => {
    setCurrentValue(value);
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              id={item.label}
              onChange={(e) => handleChange(e.target.value, item.value)}
              onBlur={(e) => onBlur()}
              value={currentValue}
            />
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                aria-label={item.label} 
                onBlur={(e) => onBlur()}
                onChange={(e) => onChange(e.target.value, item.value)}>
                <option>{item.label}</option>
                {
                    item.options.map((opt, index) => {
                    return (
                        <option key={index} value={opt}>{opt}</option>
                    )
                    })
                }
            </Form.Select>
          </FormGroup>
        )
    }
  };