export default function Query() {}

export function buildQuery(tone, goal, productName, productDescription, productPrice, productOptions, otherKeywords, generatedPromptLanguage) { 
    // TODO: set default values for other input items

    if (goal === "") {
        goal = "30 Characters Headline"
    }

    if (tone === "") {
        tone = "friendly"
    }
    return `Do not explain, answer only in ${tone} tone. 
                You are converting user text input into a Google Ad with limitation of ${goal}. 
                Please respond only in the ${generatedPromptLanguage} language.
                The followings are information for the product that the user want to create an advertisement for: 
                1. Product Name is ${productName}, 
                2. Product Description is ${productDescription},
                3. Product Price is ${productPrice}, 
                4. Product Options are ${productOptions},
                5. Other Keywords are ${otherKeywords}`;
  }