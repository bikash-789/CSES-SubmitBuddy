document
  .getElementById("submitCode")
  .addEventListener("click", async function () {
    const code = document.getElementById("codeInput").value;
    if (!code) {
      alert("Your code here!");
      return;
    }
    const fileName = "solution.cpp";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId },
        func: (fileName, code) => {
          const file = new File([code], fileName, { type: "text/plain" });
          const fileInput = document.querySelector('input[type="file"]');
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          fileInput.files = dataTransfer.files;
          const submitButton = document.querySelector('input[type="submit"]');
          if (submitButton) {
            submitButton.click();
          } else {
            alert("Submit button not found!");
          }
        },
        args: [fileName, code],
      });
    });
  });
