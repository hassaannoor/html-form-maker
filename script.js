// Sample array of objects representing form steps
const formSteps = [
  {
    stepTitle: "Step 1",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter your first name",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter your last name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter your age",
        required: true,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["Male", "Female", "Other"],
        required: true,
      },
    ],
  },
  {
    stepTitle: "Step 2",
    fields: [
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your address",
        required: true,
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: ["USA", "Canada", "Mexico"],
        required: true,
      },
      {
        name: "subscribeToNewsletter",
        label: "Subscribe to Newsletter",
        type: "checkbox",
        required: false,
      },
    ],
  },
];

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

// Example usage:
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

let formFieldsSelector =
  ".form-group input, .form-group select, .form-group textarea";
const formFields = document.querySelectorAll(formFieldsSelector);

$(document).contextmenu(formFieldsSelector, (event) => {
  event.preventDefault();

  const fieldName = event.target.name;
  const stepIndex =
    parseInt(event.target.closest(".form-step").id.slice(5)) - 1;
  const fieldIndex =
    Array.from(event.target.closest(".form-step").children).indexOf(
      event.target.closest(".form-group")
    ) - 1;
  const fieldData = formSteps[stepIndex].fields[fieldIndex];

  $("#dialog").dialog({
    autoOpen: true,
    modal: true,
    buttons: {
      Save: () => {
        const formData = {
          label: $("#label").val(),
          name: $("#name").val(),
          type: $("#type").val(),
          required: $("#required").prop("checked"),
          value: $("#value").val(),
          placeholder: $("#placeholder").val(),
        };
        formSteps[stepIndex].fields[fieldIndex] = formData;
        renderForm();
        $("#dialog").dialog("close");
      },
      Cancel: () => {
        $("#dialog").dialog("close");
      },
    },
    close: () => {
      $("#field-form")[0].reset();
    },
  });
  $("#label").val(fieldData.label);
  $("#name").val(fieldData.name);
  $("#type").val(fieldData.type);
  $("#required").prop("checked", fieldData.required);
  $("#value").val(fieldData.value);
  $("#placeholder").val(fieldData.placeholder);
});
