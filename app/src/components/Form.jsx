import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Download } from "./Download";

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

export const SortableForm = () => {
  const [formStepsState, setFormStepsState] = useState(formSteps);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    const newFormSteps = [...formStepsState];
    const [sourceField, sourceFieldIndex] = findFieldByIndex(
      source.index,
      newFormSteps
    );
    const [destinationField, destinationFieldIndex] = findFieldByIndex(
      destination.index,
      newFormSteps
    );

    if (sourceFieldIndex === destinationFieldIndex) {
      // If the source field and the destination field are in the same step
      const newFields = [...newFormSteps[sourceFieldIndex].fields];
      newFields.splice(source.index, 1);
      newFields.splice(destination.index, 0, sourceField);
      newFormSteps[sourceFieldIndex].fields = newFields;
    } else {
      // If the source field and the destination field are in different steps
      const sourceFields = [...newFormSteps[sourceFieldIndex].fields];
      const destinationFields = [...newFormSteps[destinationFieldIndex].fields];
      sourceFields.splice(source.index, 1);
      destinationFields.splice(destination.index, 0, sourceField);
      newFormSteps[sourceFieldIndex].fields = sourceFields;
      newFormSteps[destinationFieldIndex].fields = destinationFields;
    }

    setFormStepsState(newFormSteps);

    function findFieldByIndex(index, formSteps) {
      let currentFieldIndex = index;
      for (let i = 0; i < formSteps.length; i++) {
        const fields = formSteps[i].fields;
        if (currentFieldIndex < fields.length) {
          return [fields[currentFieldIndex], i];
        }
        currentFieldIndex -= fields.length;
      }
      return [null, -1];
    }
  };

  return (
    <div id="form-container">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={console.log}>
        {formStepsState.map((step, stepIndex) => (
          <Droppable droppableId={`step-${ stepIndex }`} key={stepIndex}>
            {(provided) => (
              <div
                className="form-step"
                id={`step-${ stepIndex }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="step-title">{step.stepTitle}</h2>
                {step.fields.map((field, fieldIndex) => (
                  <Draggable
                    draggableId={`step-${ stepIndex }-field-${fieldIndex}`}
                    index={fieldIndex + stepIndex + (provided.placeholder?.props?.startIndex || 0)}
                    key={step.fields[fieldIndex].name}
                  >
                    {(provided) => (
                      <div
                        className="form-group"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
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
                              onContextMenu={(event) => {
                                event.preventDefault();
                                console.log(field);
                              }}
                            />
                          </>
                        )}
                      <p className="add-field-btn">Add field</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <button type="submit">Submit</button>
      <Download formSteps={formStepsState}/>
    </div>
  );
};
