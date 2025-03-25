export async function fetchMockCases(){
    await new Promise((resolve)=>setTimeout(resolve,1000));
    console.log("Returning Mock Cases");

    // Randomly fail 10% of the time to demonstrate error handling
    if (Math.random() < 0.1) {
        throw new Error("Failed to fetch case summary")
    };

    return [
        { id: "case-1", name: "Financial Fraud", description: "Investigation of financial fraud.", status: "active" },
        { id: "case-2", name: "Tax Audits", description: "Review of pending tax audits.", status: "pending" },
        { id: "case-3", name: "Compliance case", description: "Closed corporate compliance case.", status: "closed" },
        { id: "case-4", name: "Cybersecurity Investigation", description: "Ongoing cybersecurity investigation.", status: "active" },
        { id: "case-5", name: "Regulatory Approval", description: "Pending regulatory approval.", status: "pending" },
        { id: "case-6", name: "Historical Case", description: "Historical case on file.", status: "closed" },
        { id: "case-7", name: "Evidence Review", description: "Reviewing new evidence.", status: "active" },
        { id: "case-8", name: "Third-party Review", description: "Awaiting third-party review.", status: "pending" },
        { id: "case-9", name: "Final Resolution", description: "Finalized with resolution.", status: "closed" },
        { id: "case-10", name: "Fraud Investigation", description: "Ongoing fraud investigation.", status: "active" },
        { id: "case-11", name: "Case Documentation", description: "Pending further documentation.", status: "pending" },
        { id: "case-12", name: "Government Corruption ", description: "Successfully closed corruption case.", status: "closed" },
      ];
};