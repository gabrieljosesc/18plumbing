import { PhoneLink } from "./CallButton";
import { site } from "@/lib/site";
import SocialLinks from "./SocialLinks";
import { ClockIcon, MailIcon, PhoneIcon } from "./Icons";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__inner">
        <div className="topbar__facts">
          <span className="topbar__fact">
            <PhoneIcon />
            <PhoneLink location="topbar" />
          </span>
          <span className="topbar__fact">
            <MailIcon />
            <a href={site.emailHref}>{site.email}</a>
          </span>
          <span className="topbar__fact topbar__fact--hours">
            <ClockIcon />
            {site.hours}
          </span>
        </div>

        <SocialLinks />
      </div>
    </div>
  );
}
