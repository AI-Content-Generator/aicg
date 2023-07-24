import { useState, useEffect } from "react";
import { FormItem } from "./FormItem";

export default function MultiStepFormDefault() {}

export const MultiStepForm = (props) => {
  // store step number with the answers?
  const [answers, setAnswers] = useState({ step: props.step });

  useEffect(() => {
    // check if the answers isn't empty
    if (Object.keys(answers).length > 1) {
      // update page answers
      props.onPageUpdate(answers.step, answers);
      // update page number locally
      setAnswers({ step: props.step })
    } else {
      // update page number locally
      setAnswers({ step: props.step })
    }
  }, [props.step])

  useEffect(() => {
    props.onPageUpdate(answers.step, answers);
  }, [answers])

  const updateAnswers = (value, category) => {
    setAnswers({...answers, [category]: value});
  }

  const previewAnswers = async () => {
    props.onPageBlur();
  }

  return (
    <div className="text-left overflow-scroll rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3">
      {
        props.list[props.step - 1].items?.map((item, step) => {
          return (
            <FormItem key={`${step}_${item.label}`} item={item} onChange={updateAnswers} onBlur={previewAnswers} answer={props.pagesAnswers[props.step] ? props.pagesAnswers[props.step][item.value] : null} />
          )
        })
      }
    </div>
  )
}