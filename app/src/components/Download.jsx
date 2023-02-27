/* eslint-disable */
import styles from '!raw-loader!./styles.css';
import script from '!raw-loader!./script.js';

function generateHtml(formSteps) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js"></script>

    <link
      rel="stylesheet"
      href="https://code.jquery.com/ui/1.13.1/themes/smoothness/jquery-ui.css"
    />
    <style>
    ${styles}
    </style>
  </head>
  <body>
    <h1 id="header"></h1>
    <div id="form-container"></div>
    <script>
    const formSteps = ${JSON.stringify(formSteps)}
        ${script}
    </script>
  </body>
</html>

    `;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  
function handleDownload(formSteps) {
    const html = generateHtml(formSteps);
    download('index.html', html);
}

export const Download = ({formSteps}) => {
 
  return <><button onClick={() => handleDownload(formSteps)}>Download</button></>;
};
