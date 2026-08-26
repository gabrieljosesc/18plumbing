import Image from "next/image";
import { credentials, site } from "@/lib/site";
import { GoogleIcon, ShieldCheckIcon, StarIcon } from "./Icons";

/**
 * Face + licence number — the two things that convert best on a trades site.
 *
 * Both are optional in `credentials`. Rather than invent a licence number or
 * use a stock photo of a stranger, anything not yet supplied is simply left
 * out, and the section still reads properly with whatever remains.
 */
export default function TeamTrust() {
  const { licenceNumber, teamPhoto, ownerName } = credentials;

  return (
    <section className="section" id="team">
      <div className="wrap team">
        {teamPhoto && (
          <div className="team__media reveal">
            <Image
              src={teamPhoto}
              alt={`${ownerName} of ${site.name}`}
              width={640}
              height={640}
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        )}

        <div className="reveal">
          <span className="eyebrow">Who turns up</span>
          <h2>You get {ownerName}, not a call centre</h2>
          <p>
            {site.name} is a small outfit, and that is the point. The person who
            answers the phone is the person who does the work, so nothing gets lost
            between the booking and the job.
          </p>
          <p>
            Customers mention the same things over and over in reviews: on time,
            explains the options first, leaves the place clean. That is the whole
            operating manual.
          </p>

          <ul className="team__facts">
            <li>
              <ShieldCheckIcon />
              <span>
                <strong>Licensed &amp; insured</strong>
                <span>
                  {licenceNumber
                    ? `Licence ${licenceNumber} — work done to the Ontario Building Code`
                    : "Work done to the Ontario Building Code"}
                </span>
              </span>
            </li>
            <li>
              <StarIcon />
              <span>
                <strong>
                  {site.rating.value} out of 5 across {site.rating.count} reviews
                </strong>
                <span>Every one of them from a real job in the GTA</span>
              </span>
            </li>
          </ul>

          <a
            className="btn btn--outline"
            href={site.social.google}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoogleIcon />
            Read the reviews
          </a>
        </div>
      </div>
    </section>
  );
}
