export default function Question() {}

export const sectionOneQuestions = [
  {
    label: 'Product Name',
    type: 'text',
    value: 'Product Name'
  },
  {
    label: 'Product Description',
    type: 'text',
    value: 'Product Description'
  },
  {
    label: 'Tone',
    type: 'select',
    value: 'Tone',
    options: [ 'friendly', 'uplifting', 'funny', 'witty', 'straightforward', 'humble', 'casual', 'formal', 'inspiring']
  },
  {
    label: 'Goal',
    type: 'select',
    value: 'Goal',
    options: [ '30 Characters Headline', '90 Characters Description', '125 Characters Description']
  },
]

export const sectionTwoQuestions = [
  {
    label: 'Product Price',
    type: 'text',
    value: 'Product Price'
  },
  {
    label: 'Product Options',
    type: 'text',
    value: 'Product Options'
  },
  {
    label: 'Other Keywords',
    type: 'text',
    value: 'Other Keywords'
  },
]

export const sectionThreeQuestions = [
  {
    label: 'If you are ready to submit please press `Submit`',
    type: 'information'
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