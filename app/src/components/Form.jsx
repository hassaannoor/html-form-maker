import { useEffect } from "react";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { Download } from "./Download";


export const Form = () => {
  const [formSteps, setFormSteps] = useState([
    {
      stepTitle: "Step 1",
      isDisplayed: true,
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
  ]);


  const renderForm = (formSteps) => {
    console.log('rerendering')
    let formHTML = (
        <>
        <button className="secondary" onClick={handlePrevButtonClick}>
          Prev
        </button>
        <button className="secondary" onClick={handleNextButtonClick}>
          Next
        </button>
      </>
    );
    formSteps.forEach((step, index) => {
      formHTML = (
        <>
          {formHTML}
          <div
            className="form-step"
            id={`step-${index+1}`}
            style={{ display: step.isDisplayed ? "block" : "none" }}
          >
            <h2 className="step-title">{step.stepTitle}</h2>
            {step.fields.map((field, fieldIndex) => (
              <div className="form-group" key={fieldIndex}>
                {field.type === "select" ? (
                  <>
                    <label htmlFor={field.name}>{field.label}</label>
                    <select
                      name={field.name}
                      id={field.name}
                      required={field.required}
                    >
                      {field.options.map((option, optionIndex) => (
                        <option value={option} key={optionIndex}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ) : field.type === "checkbox" ? (
                  <>
                    <input
                      type="checkbox"
                      name={field.name}
                      id={field.name}
                      required={field.required}
                    />
                    <label htmlFor={field.name}>{field.label}</label>
                  </>
                ) : (
                  <>
                    {" "}
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      onContextMenu={handleContextMenu}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      );
    });
    formHTML = (
        <div id="form-container">
            {formHTML}
            <button type="submit">Submit</button>
        </div>
    );
    return formHTML;
  };

  const handlePrevButtonClick = () => {
    setFormSteps((prevFormSteps) => {
      const currentStep = getCurrentStep(prevFormSteps);
      if (currentStep > 0) {
        prevFormSteps[currentStep].isDisplayed = false;
        prevFormSteps[currentStep - 1].isDisplayed = true;
      }
      return [...prevFormSteps];
    });
  };

  const handleNextButtonClick = () => {
    setFormSteps((prevFormSteps) => {
      const currentStep = getCurrentStep(prevFormSteps);
      if (currentStep < prevFormSteps.length - 1) {
        prevFormSteps[currentStep].isDisplayed = false;
        prevFormSteps[currentStep + 1].isDisplayed = true;
      }
      return [...prevFormSteps];
    });
  };

  const getCurrentStep = (formSteps) => {
    const currentStep = formSteps.findIndex((step) => step.isDisplayed);
    if (currentStep === -1) return  0
    else return currentStep;
  };


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState({});

  const handleContextMenu = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const stepIndex =
      parseInt(event.target.closest(".form-step").id.slice(5)) - 1;
    const fieldIndex = Array.from(
      event.target.closest(".form-step").children
    ).indexOf(event.target.closest(".form-group")) - 1;
    const fieldData = formSteps[stepIndex].fields[fieldIndex];

    setIsDialogOpen(true);
    setCurrentField({
      stepIndex,
      fieldIndex,
      fieldData,
    });
  };

  const handleDialogSave = (formData) => {
    setFormSteps((prevFormSteps) => {
      const updatedFieldData = { ...currentField.fieldData, ...formData };
      const updatedFields = [...prevFormSteps[currentField.stepIndex].fields];
      updatedFields[currentField.fieldIndex] = updatedFieldData;
      const updatedStep = {
        ...prevFormSteps[currentField.stepIndex],
        fields: updatedFields,
      };
      const updatedFormSteps = [...prevFormSteps];
      updatedFormSteps[currentField.stepIndex] = updatedStep;
      return updatedFormSteps;
    });
    setIsDialogOpen(false);
  };

  const handleDialogCancel = () => {
    setIsDialogOpen(false);
  };

  console.log('currentField', currentField.fieldData)

  return (
    <>
    <Download formSteps={formSteps}/>
      {renderForm(formSteps)}
      {
        currentField.fieldData ? 
        <Dialog
           isOpen={isDialogOpen}
           fieldData={currentField.fieldData}
           onSave={handleDialogSave}
           onCancel={handleDialogCancel}
        />
        : <></>
    }
    </>
  );
};
