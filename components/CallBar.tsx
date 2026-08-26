import { CallButton, TextButton } from "./CallButton";

/** Fixed call / quote bar pinned to the bottom of the screen on phones. */
export default function CallBar() {
  return (
    <div className="callbar">
      <CallButton className="btn btn--primary" location="mobile-bar">
        Call now
      </CallButton>
      <TextButton className="btn btn--outline" location="mobile-bar">
        Text
      </TextButton>
      <a className="btn btn--outline" href="/#contact">
        Quote
      </a>
    </div>
  );
}
