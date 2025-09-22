# upliance - React + TypeScript Form Builder (Assignment)

This project implements the Associate Software Developer assignment requirements:
- React + TypeScript + MUI
- LocalStorage persistence of form schemas
- Routes: /create, /preview, /myforms
- Derived fields via formulas referencing parent fields (p0, p1...)
- Validation rules and preview with live validation

## Run locally
1. Install Node 18+ and npm
2. `npm install`
3. `npm run start`
4. Open http://localhost:3000

## Notes
- Derived formulas are evaluated using `new Function(...)`. This is acceptable for an assignment demo but must be replaced with a safe parser in production.
- The project stores only schema/configuration in localStorage under key `upliance_forms_v1`.
- To deploy: use Vercel or Netlify (build with `npm run build`).

## Deliverables included
- Source files (React + TypeScript)
- Instructions to run and deploy

- To Run
- https://upliance-form-builder-pied.vercel.app/
