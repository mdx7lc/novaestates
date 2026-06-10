import { SITE, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-heading text-3xl tracking-[0.15em] text-white mb-4">
              {SITE.name}
            </h3>
            <p className="text-white/60 max-w-md leading-relaxed">
              {SITE.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-sm text-white/60">{SITE.location}</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SITE.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-gold transition-colors tracking-wider"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-gold transition-colors tracking-wider"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M17.232 3.232l-6.768 6.768" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8v0M12 16v-5M16 16v-3a2 2 0 00-4 0" />
    </svg>
  );
}
