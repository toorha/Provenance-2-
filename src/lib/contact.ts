/* The two ways to reach us, in one place.

   The call link previously existed only inside demo-data.ts, on an object
   whose other fields feed a retired component, so it was unreachable from
   anywhere on the live site. It is a real destination and belongs with the
   other real one. */

/* Formspree. Public by design: this endpoint id is submitted from the
   visitor's browser, so it is not a secret and does not belong in an env
   var pretending to be one. Spam is handled by Formspree plus the honeypot
   in the form, not by hiding the URL. */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/meaqzvop";

export const CALL_URL = "https://cal.com/harnav-toor-rninws";

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

/* Deliberately permissive, and the same rule the access form uses: an email
   regex that tries to encode RFC 5322 will reject valid addresses, and the
   only thing that truly proves an address is sending to it. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(f.email.trim())) e.email = "Please enter a valid email.";
  /* Optional. A name and an address is enough to start a conversation, and
     making somebody write a paragraph before they can say hello mostly
     produces "hi". If they do write something it still has to be long enough
     to be worth reading. */
  if (f.message.trim() && f.message.trim().length < MESSAGE_MIN)
    e.message = "Please tell us a little more, or leave this blank.";
  else if (f.message.trim().length > MESSAGE_MAX)
    e.message = `Please keep this under ${MESSAGE_MAX} characters.`;
  return e;
}
