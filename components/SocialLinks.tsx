import { site } from "@/lib/site";
import { FacebookIcon, GoogleIcon, InstagramIcon } from "./Icons";

/** Facebook / Instagram / Google Business links, used in the top bar and footer. */
export default function SocialLinks() {
  return (
    <div className="social-row">
      <span className="sr-only">Follow {site.name}</span>
      <a
        href={site.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on Facebook`}
      >
        <FacebookIcon />
      </a>
      <a
        href={site.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} on Instagram`}
      >
        <InstagramIcon />
      </a>
      <a
        href={site.social.google}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${site.name} reviews on Google`}
      >
        <GoogleIcon />
      </a>
    </div>
  );
}
