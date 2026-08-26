import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Shared props for the outline icons — one stroke style across the site. */
const outline = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...outline} strokeWidth={2.2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.71-2.13 1.38C1.34 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.34 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.24 10.29v3.7h5.25c-.23 1.36-1.63 4-5.25 4-3.16 0-5.74-2.62-5.74-5.85s2.58-5.85 5.74-5.85c1.8 0 3 .77 3.69 1.43l2.51-2.42C16.83 3.66 14.72 2.7 12.24 2.7 6.98 2.7 2.72 6.96 2.72 12.2s4.26 9.5 9.52 9.5c5.5 0 9.14-3.86 9.14-9.3 0-.62-.07-1.1-.16-1.58h-8.98z" />
    </svg>
  );
}

/* -------------------------------------------------- service card icons */

function PipeIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M3 5h6v6a3 3 0 0 0 3 3h3" />
      <path d="M15 9h6v6h-6z" />
      <path d="M6 5v14" />
    </svg>
  );
}

function FaucetIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M9 6h6a3 3 0 0 1 3 3v2" />
      <path d="M6 4v6" />
      <path d="M4 10h4" />
      <path d="M15 13h6v3a3 3 0 0 1-3 3 3 3 0 0 1-3-3z" />
    </svg>
  );
}

function TubIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M7 12V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2" />
      <path d="M6 20v2" />
      <path d="M18 20v2" />
    </svg>
  );
}

function SinkIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M3 10h18v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
      <path d="M12 16v5" />
      <path d="M8 21h8" />
      <path d="M12 3v7" />
    </svg>
  );
}

function TankIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <rect x="6" y="2" width="12" height="16" rx="4" />
      <path d="M9 22h6" />
      <path d="M12 18v4" />
      <path d="M9 7h6" />
    </svg>
  );
}

function ApplianceIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M7 7h.01" />
      <path d="M11 7h4" />
    </svg>
  );
}

function DropIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <path d="M12 2s6 6.5 6 10.5A6 6 0 0 1 6 12.5C6 8.5 12 2 12 2z" />
      <path d="M9.5 13.5h5" />
    </svg>
  );
}

function ValveIcon(props: IconProps) {
  return (
    <svg {...outline} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="m19.1 4.9-2.9 2.9" />
      <path d="m7.8 16.2-2.9 2.9" />
    </svg>
  );
}

export { TankIcon, DropIcon };

/** Lookup used by the services grid, keyed by `Service.icon`. */
export const serviceIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  pipe: PipeIcon,
  faucet: FaucetIcon,
  tub: TubIcon,
  sink: SinkIcon,
  tank: TankIcon,
  appliance: ApplianceIcon,
  drop: DropIcon,
  valve: ValveIcon,
};

/** Row of five filled stars, used for the 4.9 rating and each review. */
export function Stars({ label }: { label: string }) {
  return (
    <div className="stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}
