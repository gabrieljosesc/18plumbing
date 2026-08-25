import { serviceAreas } from "@/lib/site";
import { CheckIcon } from "./Icons";

export default function ServiceArea() {
  return (
    <section className="section" id="area">
      <div className="wrap area">
        <div className="reveal">
          <span className="eyebrow">Service Area</span>
          <h2>Where we work</h2>
          <p>
            Based in Toronto and covering the surrounding GTA. If you are close to the
            edge of the map, call and ask &mdash; we will tell you straight away whether
            we can get to you.
          </p>
          <ul className="area__list">
            {serviceAreas.map((area) => (
              <li key={area}>
                <CheckIcon />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <iframe
            className="area__map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-79.85%2C43.55%2C-79.10%2C43.90&layer=mapnik"
            title="Map of the Toronto and GTA area served by 18 Plumbing"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
