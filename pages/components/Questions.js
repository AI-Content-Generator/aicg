export default function Question() {}

export const sectionOneQuestions = [
  {
    label: 'Product Name',
    type: 'text',
    value: 'Product Name',
    required: true
  },
  {
    label: 'Product Description',
    type: 'text',
    value: 'Product Description',
    required: true
  },
  {
    label: 'Tone',
    type: 'select',
    value: 'Tone',
    options: [ 'friendly', 'uplifting', 'funny', 'witty', 'straightforward', 'humble', 'casual', 'formal', 'inspiring'],
    required: true
  },
  {
    label: 'Goal',
    type: 'select',
    value: 'Goal',
    options: [ '30 Characters Headline', '90 Characters Description', '125 Characters Description'],
    required: true
  },
]

export const sectionTwoQuestions = [
  {
    label: 'Product Price',
    type: 'text',
    value: 'Product Price',
    required: false
  },
  {
    label: 'Product Options',
    type: 'text',
    value: 'Product Options',
    required: false
  },
  {
    label: 'Other Keywords',
    type: 'text',
    value: 'Other Keywords',
    required: false
  },
]

export const sectionThreeQuestions = [
  {
    label: "Review your query and press 'Copy to Clipboard'!",
    type: 'information',
    value: "Review your query and press 'Copy to Clipboard'!",
    required: false
  }
]

export const combinedQuestionsList = sectionOneQuestions.concat(sectionTwoQuestions, sectionThreeQuestions)

export const questions = [
  {
    section: 1,
    items: sectionOneQuestions
  },
  {
    section: 2,
    items: sectionTwoQuestions
  },
  {
    section: 3,
    items: sectionThreeQuestions
  }
]


export const generatedPromptLanguages = {
  label: "Language",
  type: 'language',
  value: "Language",
  options: ['English', 'Mandarin', 'Hindi', 'Spanish', 'French', 'Modern Standard Arabic', 'Bengali', 'Russian', 'Portuguese', 'Urdu', 'Indonesian', 'German', 'Japanese'],
  default: 'English',
  required: false
}
