# Hospital portal — UI kit

Recreation of the NewMed Skills hospital-facing product: the workforce pipeline dashboard used by hospital / HR teams to track candidates from sourcing to retention.

**Interactive:**
- Left **sidebar** switches views (Pipeline is the built-out demo; other views show a branded placeholder).
- **Candidate cards** open a right-side **drawer** with readiness, licensing, and a compliance checklist (DataFlow, DHA/SCFHS/Prometric, visa).
- Filter **tags** and top-bar search are present as cosmetic controls.

**Structure** (`PortalApp.jsx`): `Sidebar` · `Topbar` · `Pipeline` (`StatRow` + `StepFlow` + candidate grid) · `Drawer` · `Placeholder`.

Composes the DS primitives (`Card`, `Stat`, `Badge`, `Tag`, `ProgressBar`, `Avatar`, `StepFlow`, `Button`, `IconButton`, `Input`, `Logo`, `Symbol`). Open `index.html`.
