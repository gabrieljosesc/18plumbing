import Image from "next/image";
import { site } from "@/lib/site";

/** Logo lock-up: circular mark plus the wordmark and "Licensed & Insured". */
export default function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label={`${site.name} — home`}>
      <Image
        src="/img/logo.jpg"
        alt=""
        width={46}
        height={46}
        priority={priority}
        sizes="46px"
      />
      <span>
        <span className="brand__name">18 PLUMBING</span>
        <span className="brand__tag">Licensed &amp; Insured</span>
      </span>
    </a>
  );
}
