const questionRegex = /\b(hello|I want)\b/i;


export const processQuestion = (question: string) => {
  if (questionRegex.test(question)) {
    return "Hello! How can I help you?";
  } else {
    return "I'm sorry I did not understand your question";
  }
};
