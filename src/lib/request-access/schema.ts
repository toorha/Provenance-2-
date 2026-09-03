/* The shape of an access request, shared by the form and the server action.

   ONE DEFINITION, TWO CONSUMERS. The client uses it to show errors as you
   type; the server uses it to decide what actually gets stored. Client
   validation is a convenience and nothing more: the action re-validates
   everything from scratch, because anything the browser sends can be forged.

   No validation library. The rules are six fields deep and writing them by
   hand keeps the bundle honest. */

export const ROLES = [
  "Development",
  "Asset Management",
  "Acquisitions / Investments",
  "Leasing",
  "Operations",
  "Planning",
  "Construction",
  "Executive / Leadership",
  "Other",
] as const;

/* hyphens, not en dashes, because these strings are also a database check
   constraint and a typographic dash there is a support ticket waiting */
export const PORTFOLIO_SIZES = [
  "1-10 properties",
  "11-50 properties",
  "51-100 properties",
  "101-500 properties",
  "500+ properties",
  "Not sure / Not applicable",
] as const;

export const STATUSES = [
  "new",
  "contacted",
  "demo_scheduled",
  "design_partner",
  "closed",
  "not_a_fit",
] as const;

export type RequestAccessFields = {
  name: string;
  workEmail: string;
  company: string;
  role: string;
  portfolioSize: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof RequestAccessFields, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

/* Deliberately permissive. An email regex that tries to encode RFC 5322 will
   reject valid addresses, and the only thing that truly proves an address is
   sending to it. This rejects the obviously malformed and nothing else. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalize(raw: Partial<RequestAccessFields>) {
  return {
    name: (raw.name ?? "").trim(),
    workEmail: (raw.workEmail ?? "").trim().toLowerCase(),
    company: (raw.company ?? "").trim(),
    role: (raw.role ?? "").trim(),
    portfolioSize: (raw.portfolioSize ?? "").trim(),
    message: (raw.message ?? "").trim(),
  };
}

export function validate(fields: RequestAccessFields): FieldErrors {
  const errors: FieldErrors = {};

  if (fields.name.length < 2) errors.name = "Please enter your name.";

  if (!EMAIL.test(fields.workEmail))
    errors.workEmail = "Please enter a valid work email.";

  if (fields.company.length < 2)
    errors.company = "Please enter your company.";

  if (!(ROLES as readonly string[]).includes(fields.role))
    errors.role = "Please choose a role.";

  /* optional, but if something was sent it has to be one of ours: the column
     carries the same list as a check constraint */
  if (
    fields.portfolioSize &&
    !(PORTFOLIO_SIZES as readonly string[]).includes(fields.portfolioSize)
  )
    errors.portfolioSize = "Please choose one of the listed options.";

  if (fields.message.length < MESSAGE_MIN)
    errors.message = "Please tell us a little more.";
  else if (fields.message.length > MESSAGE_MAX)
    errors.message = `Please keep this under ${MESSAGE_MAX} characters.`;

  return errors;
}
