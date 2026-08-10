import { CSSProperties } from "react";

/**
 * The signature journey — arrow-shaped cards in sequence, chevron-notched so each
 * point nests into the next. Defaults to the six-stage NewMed Skills path.
 * @startingPoint section="Brand" subtitle="Source → Assess → … → Retain journey" viewport="1100x120"
 */
export interface StepFlowProps {
  /** @default ["Source","Assess","Develop","Certify","Deploy","Retain"] */
  steps?: string[];
  /** Index of the current stage (orange). -1 for none. @default -1 */
  active?: number;
  /** Card fill for inactive stages. @default "white" */
  tone?: string;
  style?: CSSProperties;
}
export function StepFlow(props: StepFlowProps): JSX.Element;
