import { useState, useEffect } from "react";
import { FormItem } from "./FormItem";

export default function MultiStepFormDefault() {}

export const MultiStepForm = (props) => {
  // store step number with the answers?
  const [answers, setAnswers] = useState({ step: props.step });
<<<<<<< HEAD
  const [requiredFields, setRequiredFields] = useState([]);
=======

  useEffect(() => {
    // check if the answers isn't empty
    if (Object.keys(answers).length > 1) {
      // update page answers
      props.onPageUpdate(answers.step, answers);
      // update page number locally
      setAnswers({...answers, step: props.step })
    } else {
      // update page number locally
      setAnswers({...answers, step: props.step })
    }
  }, [props.step])
>>>>>>> 74a35d6 (fix: React state so that Previous button remember the previous input)

  useEffect(() => {
    props.onPageUpdate(answers.step, answers);
  }, [answers])

  const updateAnswers = (value, category) => {
    setAnswers({...answers, [category]: value});
  }

  const handleBlur = (field, value, isRequired) => {
    // Check if the required field is filled or not, and update the requiredFields state
    if (isRequired) {
      if (field && field.trim() !== '') {
      setRequiredFields((prevFields) => prevFields.filter((item) => item !== value));
      } else {
        setRequiredFields((prevFields) => [...prevFields, value]);
      }
    }
    checkIsValidated();
    props.onPageBlur();
  }

  const checkIsValidated = () => {
    let isValid = true
    for (const item of props.list[props.step - 1].items || []) {
      if (item.required && (!answers[item.value] || answers[item.value].trim() === "")) {
        isValid = false;
        break;
      }
    }
    props.checkIsValidated(isValid)
  }

  return (
    <div className="text-left overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      {
        props.list[props.step - 1].items?.map((item, step) => {
          return (
            <div>
              <FormItem 
                key={`${step}_${item.label}`} 
                item={item} 
                onChange={updateAnswers} 
                onBlur={() => handleBlur(answers[item.value], item.value, item.required)} 
                answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null} 
                isRequiredError={requiredFields.includes(item.value)}
                />
            </div>
          )
        })
      }
    </div>
  )
}