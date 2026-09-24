import { PhoneLink } from "./CallButton";
import { site } from "@/lib/site";
import Brand from "./Brand";
import SocialLinks from "./SocialLinks";

const SERVICE_LINKS = [
  "Drains & blockages",
  "Faucets & fixtures",
  "Bathrooms",
  "Kitchens",
  "Hot water tanks",
  "Appliance hook-ups",
];

const COMPANY_LINKS = [
  { href: "#about", label: "About us" },
  { href: "#work", label: "Our work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#area", label: "Service area" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__about">
            <Brand />
            <p>
              Low-rise residential and commercial plumbing service and installation
              across Toronto and the GTA. {site.hours}.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <a href="#services">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul>
              <li>
                <PhoneLink location="footer" />
              </li>
              <li>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>{site.areaLabel}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            &copy; {new Date().getFullYear()} {site.name}. Licensed &amp; insured.
          </span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
