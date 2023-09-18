import { useState, useCallback, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Editor from "./Editor";
import { MultiStepForm } from "./MultiStepsForm";
import { MultiStepsProgressBar } from "./MultiStepsProgressBar";
import { questions, combinedQuestionsList, generatedPromptLanguages } from "./Questions";
import { buildQuery } from "../constant/Queries";

export default function TextInput() {
  const initialResult = "Your input prompt will be shown here."
  const totalPagesCount = questions?.length || 0;

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [pagesAnswers, setPagesAnswers] = useState({});

  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState(initialResult);
  const [logMsg, setlogMsg] = useState("");
  const [isValidated, setIsValidated] = useState(false)
  const [generatedPromptLanguage, setGeneratedPromptLanguage] = useState("English")
  
  const [waiting, setWaiting] = useState(false);
  const [inputItems, setInputItems] = useState(combinedQuestionsList);
  const [selGoal, setSelGoal] = useState("");
  const [selTone, setSelTone] = useState("");
  

  // Buttons for Muti Steps Progress Bar
  const prevButton = () => {
    if (step > 1) {
      setStep(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if ( !isValidated ) {
      alert("Please fill all required fields.");
    } else if (step - 3) {
      setStep(prevIndex => prevIndex + 1);
    } else {
      // clear the form on submit
      // Used to be: submitInputItems(). No longer submitting for plugin use case.
      handleCopyToClipboard();
      setPagesAnswers({});
      setInputItems(combinedQuestionsList)
      setSubmitted(true);
    }
  }

  const handleRestart = () => {
    setStep(1);
    setSubmitted(false);
    setResult(initialResult)
    setIsValidated(false);
  }

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
    window.close();
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(result) // for popup modal to work
  }

  const copyToClipboard = (textToCopy, containerElement = document.body) => {    
    const textField = document.createElement('textarea');            
    textField.value = textToCopy;
    containerElement.appendChild(textField);
    textField.select();
    document.execCommand('copy'); 
    containerElement.removeChild(textField);
  }

  const handleGeneratedPromptLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setGeneratedPromptLanguage(selectedLanguage);
  }

  // pageAnswer is the input items on each page
  const onPageAnswerUpdate = (step, answersObj) => {
    updateInputItems(answersObj)
    setPagesAnswers((pagesAnswers) => ({...pagesAnswers, [step]: answersObj}));
  }

  const onPageAnswerBlur = () => {
    const processedInputItems = processInputItems(inputItems)

    let productName = processedInputItems['Product Name']
    let productDescription = processedInputItems['Product Description']
    let tone = processedInputItems['Tone']
    let goal = processedInputItems['Goal']
    let productPrice = processedInputItems['Product Price']
    let productOptions = processedInputItems['Product Options']
    let otherKeywords = processedInputItems['Other Keywords']
    const query = buildQuery(tone, goal, productName, productDescription, productPrice, productOptions, otherKeywords, generatedPromptLanguage)
    setResult(query);
  }

  // TODO: Not sure if we can delete this
  useEffect(() => {
    let ranOnce = false;

    const handler = event => {
      const data = event.data
      if (!ranOnce) {
        setlogMsg(data.logMsg);
        ranOnce = true;
      } else {
        setlogMsg(msg => msg + '\n' + data.logMsg);
      }
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, [result])
  
  // inputItems is the collection of answers from all pages/steps
  const updateInputItems = (answersObj) => {
    const updatedInputItems = inputItems.map((item) => {
      if (item.label in answersObj) {
        const value = answersObj[item.label];
        return { ...item, value };
      } else {
        return { ...item }
      }
    });

    setInputItems(updatedInputItems);
  };

  // Convert the input into a dictionary {"Product Name" : "unbrella", "Tone" : " Friendly", ...}
  const processInputItems = (inputItems) => {
    var inputItemsDict = {}

    for (const idx in inputItems) {
      const inputItem = inputItems[idx]
      if (inputItem.value != null && inputItem.value != inputItem.label) {
        inputItemsDict[inputItem.label] = inputItem.value
      }
    }

    return inputItemsDict
  }

  const checkIsValidated = (isValid) => {
    setIsValidated(isValid)
  }

  // Upon "submit" button is hit
  async function submitInputItems(event) {
    setlogMsg("");
    setWaiting(true);
    setResult("// Please be patient, this may take a while...");
    setSelGoal("");
    const processedInputItems = processInputItems(inputItems)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_API_URL || ''}/api/generateText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          productName: processedInputItems['Product Name'],
          productDescription: processedInputItems['Product Description'],
          tone: processedInputItems['Tone'],
          goal: processedInputItems['Goal'],
          productPrice: processedInputItems['Product Price'],
          productOptions: processedInputItems['Product Options'],
          otherKeywords: processedInputItems['Other Keywords'],
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        setWaiting(false);
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setResult(data.code);
      setWaiting(false);
    } catch(error) {
      alert(error.message);
      setWaiting(false);
    }
  }

  const editorChange = useCallback((value, viewUpdate) => {
    setResult(value);
  }, []);
  

  return (
    <div className="rounded-md border border-gray-100 shadow-md shadow-emerald-600/30 bg-white p-3 flex flex-col gap-4 2xl:w-full">
      <div className="flex justify-between xs:mb-2">
        <h3 className="font-semibold text-gray-500">Create your prompt</h3>
        <select 
          className="flex dropdown-box" 
          onChange={handleGeneratedPromptLanguageChange}
          onBlur={onPageAnswerBlur} 
          style={{
          width: "150px"}}
        >
          {generatedPromptLanguages.options.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <Container className="flex flex-col gap-4 2xl:w-full">
        <Row className="m-5">
          <Col className="align-self-center">
            <MultiStepsProgressBar step={step}/>
          </Col>
        </Row>

        <Row>
          {
            submitted ?
            <Card>
              <Card.Body>
                <div className="flex justify-between xs:mb-2">
                  <p className="font-semibold text-gray-400">Your prompt has been copied to clipboard!</p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="flex justify-between xs:mb-2">
                  <Button className="button left-button" onClick={handleRestart}>Start Over</Button>
                  <Button id="closeButton" className="button right-button" onClick={handleClose}>Close</Button>
                </div>
              </Card.Footer>
            </Card> :
          <Card>
            <Card.Body>
              <MultiStepForm
                list={questions}
                step={step}
                onPageUpdate={onPageAnswerUpdate}
                pagesAnswers={pagesAnswers}
                onPageBlur={onPageAnswerBlur}
                checkIsValidated={checkIsValidated}
              />
            </Card.Body>
            <Card.Footer className="button-container d-flex justify-content-between flex 2xl:w-full">
            <Button className={`button left-button ${step > 1 ? "" : "button-grey"}`} onClick={prevButton} disabled={step == 1}>Previous</Button>
              <Button className={`button right-button ${isValidated ? "" : "button-grey"}`} onClick={nextButton}>
                {step == totalPagesCount ? 'Copy to Clipboard' : 'Next'}
              </Button>
            </Card.Footer>
          </Card>
        }
        </Row>        
      </Container>
      
      <Editor key="editor-01" result={result} onChange={editorChange} waiting={waiting}/>
    </div>
  );
  }