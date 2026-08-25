import { site } from "@/lib/site";
import { PhoneIcon } from "./Icons";

/** Fixed call / quote bar pinned to the bottom of the screen on phones. */
export default function CallBar() {
  return (
    <div className="callbar">
      <a className="btn btn--primary" href={site.phoneHref}>
        <PhoneIcon />
        Call now
      </a>
      <a className="btn btn--outline" href="#contact">
        Get a quote
      </a>
    </div>
  );
}
