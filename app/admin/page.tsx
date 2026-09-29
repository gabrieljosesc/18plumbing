import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/app/actions";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import { requireAdmin } from "@/lib/admin";
import {
  INSPECTION_STATUSES,
  LEAD_STATUSES,
  MEMBER_STATUSES,
  PREFERRED_TIME_LABELS,
  PRIORITY_STATUSES,
  STATUS_LABELS,
} from "@/lib/admin-schema";
import { planOptions } from "@/lib/site";
import { formatDate, formatDateTime, formatDay, toTorontoInput } from "@/lib/time";
import {
  updateInspection,
  updateLeadStatus,
  updateMemberStatus,
  updatePriorityStatus,
} from "./actions";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

type Lead = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  postal_code: string;
  problem: string;
  service: string | null;
  source_slug: string | null;
  photo_paths: string[];
  status: string;
  notes: string | null;
};

type PriorityRow = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  address: string;
  email: string | null;
  notes: string | null;
  status: string;
};

type Profile = {
  id: string;
  created_at: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  member_number: string;
  member_since: string;
  membership_status: string;
  plan: string | null;
  plan_requested_at: string | null;
};

type Inspection = {
  id: string;
  created_at: string;
  member_id: string;
  address: string;
  preferred_date: string | null;
  preferred_time: string | null;
  notes: string | null;
  status: string;
  scheduled_for: string | null;
};

/** Signed URLs live for an hour — long enough to work a lead, short enough to matter. */
const PHOTO_URL_TTL_SECONDS = 60 * 60;

function Pill({ status }: { status: string }) {
  return <span className={`pill pill--${status}`}>{STATUS_LABELS[status] ?? status}</span>;
}

/**
 * A select and a Save button. No client JavaScript — it is a plain form posting
 * to a server action, which is all a status change needs.
 */
function StatusForm({
  action,
  id,
  value,
  options,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  value: string;
  options: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <form action={action} className="admin-inline">
      <input type="hidden" name="id" value={id} />
      {children}
      <select name="status" defaultValue={value} aria-label="Status">
        {options.map((option) => (
          <option key={option} value={option}>
            {STATUS_LABELS[option] ?? option}
          </option>
        ))}
      </select>
      <button className="btn btn--outline btn--sm" type="submit">
        Save
      </button>
    </form>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { supabase, user } = await requireAdmin();

  const [leadsResult, priorityResult, profilesResult, inspectionsResult] =
    await Promise.all([
      supabase
        .from("leads")
        .select(
          "id, created_at, full_name, phone, email, postal_code, problem, service, source_slug, photo_paths, status, notes",
        )
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("priority_list")
        .select("id, created_at, full_name, phone, address, email, notes, status")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("profiles")
        .select(
          "id, created_at, full_name, phone, address, member_number, member_since, membership_status, plan, plan_requested_at",
        )
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("inspection_requests")
        .select(
          "id, created_at, member_id, address, preferred_date, preferred_time, notes, status, scheduled_for",
        )
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

  const leads = (leadsResult.data ?? []) as Lead[];
  const priority = (priorityResult.data ?? []) as PriorityRow[];
  // The signup trigger gives the admin login a profile row too. It is not a member.
  const members = ((profilesResult.data ?? []) as Profile[]).filter((p) => p.id !== user.id);
  const inspections = (inspectionsResult.data ?? []) as Inspection[];
  const profilesById = new Map(members.map((profile) => [profile.id, profile]));

  // One signed-URL call for every photo on the page, then map them back.
  const allPaths = leads.flatMap((lead) => lead.photo_paths ?? []);
  const photoUrls = new Map<string, string>();
  if (allPaths.length) {
    const { data } = await supabase.storage
      .from("lead-photos")
      .createSignedUrls(allPaths, PHOTO_URL_TTL_SECONDS);
    for (const entry of data ?? []) {
      if (entry.path && entry.signedUrl) photoUrls.set(entry.path, entry.signedUrl);
    }
  }

  const counts = {
    newLeads: leads.filter((lead) => lead.status === "new").length,
    newPriority: priority.filter((row) => row.status === "new").length,
    pendingMembers: members.filter((m) => m.membership_status === "pending").length,
    openInspections: inspections.filter((row) => row.status === "requested").length,
  };

  const planLabel = (value: string | null) =>
    planOptions.find((option) => option.value === value)?.label ?? "—";

  return (
    <>
      <TopBar />
      <Header signedIn showNav={false} />

      <main className="admin" id="main">
        <div className="wrap">
          <header className="account-head">
            <div>
              <span className="eyebrow">Staff</span>
              <h1>Dashboard</h1>
              <p>Signed in as {user.email}</p>
            </div>
            <form action={signOut}>
              <button className="btn btn--outline" type="submit">
                Sign out
              </button>
            </form>
          </header>

          {params.saved && (
            <div className="admin-notice admin-notice--ok" role="status">
              Saved.
            </div>
          )}
          {params.error && (
            <div className="admin-notice admin-notice--err" role="alert">
              That change did not save. Try again, and if it keeps failing tell
              whoever looks after the site.
            </div>
          )}

          <nav className="admin-stats" aria-label="Sections">
            <a className="admin-stat" href="#leads">
              <strong>{counts.newLeads}</strong>
              <span>new leads</span>
            </a>
            <a className="admin-stat" href="#priority">
              <strong>{counts.newPriority}</strong>
              <span>new on the priority list</span>
            </a>
            <a className="admin-stat" href="#members">
              <strong>{counts.pendingMembers}</strong>
              <span>members awaiting payment</span>
            </a>
            <a className="admin-stat" href="#inspections">
              <strong>{counts.openInspections}</strong>
              <span>inspections to schedule</span>
            </a>
          </nav>

          <div className="admin-sections">
            <section className="panel" id="leads" aria-labelledby="leads-heading">
              <h2 id="leads-heading">Leads</h2>
              <p className="panel__lede">
                From the website form. Newest first, last 200. Photo links expire
                after an hour — reload the page for fresh ones.
              </p>
              {leads.length === 0 ? (
                <p className="is-muted">No leads yet.</p>
              ) : (
                <div className="table-scroll">
                  <table className="account-table admin-table">
                    <thead>
                      <tr>
                        <th scope="col">Received</th>
                        <th scope="col">Who</th>
                        <th scope="col">Problem</th>
                        <th scope="col">Came from</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id}>
                          <td>{formatDateTime(lead.created_at)}</td>
                          <td>
                            <div className="admin-stack">
                              <strong>{lead.full_name}</strong>
                              <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}>{lead.phone}</a>
                              {lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}
                              <span className="is-muted">{lead.postal_code}</span>
                            </div>
                          </td>
                          <td>
                            <div className="is-wrap">{lead.problem}</div>
                            {lead.photo_paths?.length > 0 && (
                              <div className="admin-photos">
                                {lead.photo_paths.map((path) => {
                                  const url = photoUrls.get(path);
                                  return url ? (
                                    <a key={path} href={url} target="_blank" rel="noopener">
                                      {/* Signed URL, not a static asset — next/image has nothing to add. */}
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={url} alt="Photo sent with the lead" />
                                    </a>
                                  ) : null;
                                })}
                              </div>
                            )}
                            {lead.notes && <div className="is-muted">{lead.notes}</div>}
                          </td>
                          <td>
                            <div className="admin-stack">
                              <span>{lead.service ?? "General"}</span>
                              {lead.source_slug && (
                                <Link className="is-muted" href={`/${lead.source_slug}`}>
                                  /{lead.source_slug}
                                </Link>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="admin-stack">
                              <Pill status={lead.status} />
                              <StatusForm
                                action={updateLeadStatus}
                                id={lead.id}
                                value={lead.status}
                                options={LEAD_STATUSES}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="panel" id="priority" aria-labelledby="priority-heading">
              <h2 id="priority-heading">Priority list</h2>
              <p className="panel__lede">
                Free sign-ups. Call them, then mark contacted or converted.
              </p>
              {priority.length === 0 ? (
                <p className="is-muted">Nobody on the list yet.</p>
              ) : (
                <div className="table-scroll">
                  <table className="account-table admin-table">
                    <thead>
                      <tr>
                        <th scope="col">Joined</th>
                        <th scope="col">Who</th>
                        <th scope="col">Address</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priority.map((row) => (
                        <tr key={row.id}>
                          <td>{formatDate(row.created_at)}</td>
                          <td>
                            <div className="admin-stack">
                              <strong>{row.full_name}</strong>
                              <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}>{row.phone}</a>
                              {row.email && <a href={`mailto:${row.email}`}>{row.email}</a>}
                            </div>
                          </td>
                          <td className="is-wrap">{row.address}</td>
                          <td className="is-wrap is-muted">{row.notes ?? "—"}</td>
                          <td>
                            <div className="admin-stack">
                              <Pill status={row.status} />
                              <StatusForm
                                action={updatePriorityStatus}
                                id={row.id}
                                value={row.status}
                                options={PRIORITY_STATUSES}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="panel" id="members" aria-labelledby="members-heading">
              <h2 id="members-heading">Members</h2>
              <p className="panel__lede">
                Paid-plan accounts. Set a member to <strong>Active</strong> once
                payment is taken — their benefits and the booking form appear on
                their next page load.
              </p>
              {members.length === 0 ? (
                <p className="is-muted">No members yet.</p>
              ) : (
                <div className="table-scroll">
                  <table className="account-table admin-table">
                    <thead>
                      <tr>
                        <th scope="col">Joined</th>
                        <th scope="col">Member</th>
                        <th scope="col">Address</th>
                        <th scope="col">Plan</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member) => (
                        <tr key={member.id}>
                          <td>{formatDate(member.created_at)}</td>
                          <td>
                            <div className="admin-stack">
                              <strong>{member.full_name ?? "—"}</strong>
                              <span className="is-muted">{member.member_number}</span>
                              {member.phone && (
                                <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}>
                                  {member.phone}
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="is-wrap">{member.address ?? "—"}</td>
                          <td>
                            <div className="admin-stack">
                              <span>{planLabel(member.plan)}</span>
                              {member.plan_requested_at && (
                                <span className="is-muted">
                                  chose it {formatDate(member.plan_requested_at)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="admin-stack">
                              <Pill status={member.membership_status} />
                              <StatusForm
                                action={updateMemberStatus}
                                id={member.id}
                                value={member.membership_status}
                                options={MEMBER_STATUSES}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="panel" id="inspections" aria-labelledby="inspections-heading">
              <h2 id="inspections-heading">Inspection bookings</h2>
              <p className="panel__lede">
                Members&rsquo; annual inspections. Pick a date and time, set the
                status to Scheduled, and it shows on their account.
              </p>
              {inspections.length === 0 ? (
                <p className="is-muted">No bookings yet.</p>
              ) : (
                <div className="table-scroll">
                  <table className="account-table admin-table">
                    <thead>
                      <tr>
                        <th scope="col">Requested</th>
                        <th scope="col">Member</th>
                        <th scope="col">Address</th>
                        <th scope="col">Preferred</th>
                        <th scope="col">Scheduled &amp; status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspections.map((row) => {
                        const member = profilesById.get(row.member_id);
                        return (
                          <tr key={row.id}>
                            <td>{formatDate(row.created_at)}</td>
                            <td>
                              <div className="admin-stack">
                                <strong>{member?.full_name ?? "Unknown member"}</strong>
                                {member && <span className="is-muted">{member.member_number}</span>}
                                {member?.phone && (
                                  <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}>
                                    {member.phone}
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="is-wrap">{row.address}</td>
                            <td>
                              <div className="admin-stack">
                                <span>{row.preferred_date ? formatDay(row.preferred_date) : "Flexible"}</span>
                                <span className="is-muted">
                                  {PREFERRED_TIME_LABELS[row.preferred_time ?? "any"] ?? "Any time"}
                                </span>
                                {row.notes && <span className="is-muted is-wrap">{row.notes}</span>}
                              </div>
                            </td>
                            <td>
                              <div className="admin-stack">
                                <Pill status={row.status} />
                                <StatusForm
                                  action={updateInspection}
                                  id={row.id}
                                  value={row.status}
                                  options={INSPECTION_STATUSES}
                                >
                                  <input
                                    type="datetime-local"
                                    name="scheduledFor"
                                    defaultValue={toTorontoInput(row.scheduled_for)}
                                    aria-label="Scheduled for (Toronto time)"
                                  />
                                </StatusForm>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
