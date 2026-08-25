import { services, site } from "@/lib/site";
import { serviceIcons } from "./Icons";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Installation &middot; Maintenance &middot; Repair</span>
          <h2>What we do</h2>
          <p>
            Everything from a dripping tap to a full fixture rough-in &mdash; for
            houses, low-rise buildings and small commercial units.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article className="service-card reveal" key={service.id}>
                <span className="service-card__icon">{Icon ? <Icon /> : null}</span>
                <h3>{service.title}</h3>
                <p>{service.blurb}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="services-note reveal">
          <p>
            <strong>Also on the truck:</strong> installation, service and repairs of
            drains, fixtures, showers, bathtubs, toilets, lavatories, hot water tanks,
            kitchen sinks, dishwashers, cold water refrigerator lines, pumps, washing
            machines, water filtration, hose bibs and valves. If it carries water, we
            can look at it &mdash; <a href={site.phoneHref}>give us a call</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
