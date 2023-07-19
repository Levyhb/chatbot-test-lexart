export const processQuestion = (question: string) => {
  if (question.toLowerCase() === "conversations") {
    return [
      {
        option: "Saved conversations",
        link: `${window.location.href}/conversation`,
      },
    ]
  }
  if (question.toLowerCase() === "loan") {
    return [
      {
        option: "Do you want to apply for a loan?",
        link: "https://www.example.com/apply-loan",
      },
      {
        option: "Loan conditions",
        link: "https://www.example.com/loan-conditions",
      },
      {
        option: "Help",
        link: "https://www.example.com/help",
      },
    ];
  } else if (
    question.toLowerCase().includes("do you want to apply for a loan")
  ) {
    return "Apply for a loan with us in just a few simple steps. Visit our website or contact our customer support for assistance.";
  } else if (question.toLowerCase().includes("loan conditions")) {
    return "Our loan conditions are designed to suit your needs. We offer competitive interest rates, flexible repayment terms, and various loan amounts.";
  } else if (question.toLowerCase().includes("help")) {
    return "We're here to assist you! If you need any help regarding loans, loan conditions, or any other queries, feel free to reach out to our customer support team";
  } else if (question.toLowerCase().includes("saved conversations")) {
    return "Here you can see more about your saved conversations";
  } else {
    return "I'm sorry I did not understand your question";
  }
};
