# Marketing site — UI kit

Recreation of the NewMed Skills public marketing homepage. Composes the design-system primitives (`Logo`, `Button`, `Eyebrow`, `StepFlow`, `Card`, `Stat`, `Badge`, `Orb`, `Input`, `Select`).

**Interactive:**
- Nav audience toggle — **For candidates / For hospitals** swaps the hero copy, headline, CTA, and stat row (register shifts to L4/L5 for the candidate hero).
- **Book a call** (nav + CTA band) opens a modal lead form.

**Structure** (`MarketingApp.jsx`): `Nav` · `Hero` (with `Orb` backdrop) · `TrustBar` (DHA / SCFHS / Prometric / DataFlow) · `Journey` (`StepFlow`) · `Values` (3 cards) · `CTABand` (ink) · `Footer` · `BookModal`.

Open `index.html`. Copy follows the voice guide: sentence case, one idea per sentence, every claim carries a number, no banned words.
