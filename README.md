# FormDesigner - React + TypeScript Form Builder 

A dynamic form builder built with React, TypeScript, and Material-UI (MUI).
Users can design custom forms, add validation, preview results, and persist form schemas directly in the browser.

✨ Features

React + TypeScript + MUI front-end

LocalStorage persistence of form schemas under key upliance_forms_v1

Routes

/create – design a new form

/preview – live preview with validation

/myforms – manage saved form schemas

Derived fields using formulas referencing parent fields (p0, p1, …)

Validation rules with real-time feedback

🚀 Run Locally

Install Node 18+ and npm

Install dependencies:

npm install


Start the development server:

npm run start


Open http://localhost:3000
 in your browser.

🗒️ Notes

Derived formulas are currently evaluated with new Function(...).
This works for demos but should be replaced with a secure parser in production.

Only the schema/configuration (not user submissions) is stored in LocalStorage.

- Live Demo
- https://upliance-form-builder-pied.vercel.app/
