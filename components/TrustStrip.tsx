import { CheckIcon, ClockIcon, PinIcon, ShieldCheckIcon } from "./Icons";

const ITEMS = [
  {
    Icon: ShieldCheckIcon,
    title: "Licensed & insured",
    detail: "Work done to the Ontario Building Code",
  },
  {
    Icon: ClockIcon,
    title: "Open 24 hours",
    detail: "Emergency calls answered any time",
  },
  {
    Icon: CheckIcon,
    title: "Clean, tidy work",
    detail: "We leave the space the way we found it",
  },
  {
    Icon: PinIcon,
    title: "Toronto & the GTA",
    detail: "Low-rise residential & commercial",
  },
];

export default function TrustStrip() {
  return (
    <div className="wrap">
      <div className="trust reveal">
        {ITEMS.map(({ Icon, title, detail }) => (
          <div className="trust__item" key={title}>
            <span className="trust__icon">
              <Icon />
            </span>
            <span>
              <strong>{title}</strong>
              <span>{detail}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
