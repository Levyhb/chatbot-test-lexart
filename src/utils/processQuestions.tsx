export const processQuestion = (question: string) => {
  if (question.toLowerCase() === "hello") {
    return "Hello! How can I help you?";
  } else {
    return "I'm sorry I did not understand your question";
  }
};
