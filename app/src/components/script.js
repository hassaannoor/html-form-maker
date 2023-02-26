/* eslint-disable */

function generateForm(formSteps) {
  let formHTML =
    "<button class='secondary' id='prev-btn'>Prev</button><button  class='secondary' id='next-btn'>Next</button>";
  let stepNumber = 1;
  formSteps.forEach((step) => {
    formHTML += `<div class="form-step" id="step-${stepNumber}">`;
    formHTML += `<h2 class="step-title">${step.stepTitle}</h2>`;
    step.fields.forEach((field) => {
      formHTML += `<div class="form-group">`;
      if (field.type === "select") {
        formHTML += `<label for="${field.name}">${field.label}</label>`;
        formHTML += `<select name="${field.name}" id="${field.name}" ${
          field.required ? "required" : ""
        }>`;
        field.options.forEach((option) => {
          formHTML += `<option value="${option}">${option}</option>`;
        });
        formHTML += `</select>`;
      } else if (field.type === "checkbox") {
        formHTML += `<input type="checkbox" name="${field.name}" id="${
          field.name
        }" ${field.required ? "required" : ""}>`;
        formHTML += `<label for="${field.name}">${field.label}</label>`;
      } else {
        formHTML += `<label for="${field.name}">${field.label}</label>`;
        formHTML += `<input type="${field.type}" name="${field.name}" id="${
          field.name
        }" placeholder="${field.placeholder}" ${
          field.required ? "required" : ""
        }>`;
      }
      formHTML += `</div>`;
    });
    formHTML += `</div>`;
    stepNumber++;
  });
  formHTML += `<button type="submit">Submit</button>`;
  return formHTML;
}

const formContainer = document.getElementById("form-container");
renderForm();

function renderForm() {
  formContainer.innerHTML = generateForm(formSteps);

  const formStepsEl = document.querySelectorAll(".form-step");
  let currentStep = 0;

  showStep(currentStep);

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentStep < formStepsEl.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });

  function showStep(stepIndex) {
    formStepsEl.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "block";
      } else {
        step.style.display = "none";
      }
    });
  }
}
