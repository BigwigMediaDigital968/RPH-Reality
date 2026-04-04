import Image from "next/image";
import logo from "../assets/RPH-logo-nav.png"

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-16 lg:pt-20 pb-8">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-navy-800">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="font-display text-white mb-4">
              <div className="relative w-40 h-10 lg:w-48 lg:h-12">
                <Image
                  src={logo}
                  alt="Royal Prime Homes"
                  className={`object-contain w-full h-full invert brightness-0 invert`}
                  fill
                  priority
                />
              </div>
            </div>
            <p className="font-sans text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              Goa's trusted real estate partner. Helping clients find their
              perfect home since 2013.
            </p>
            <div className="flex gap-3">
              {["in", "f", "ig", "x"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full border border-navy-700 flex items-center justify-center text-white/40 hover:border-gold-400 hover:text-gold-400 transition-all duration-200 text-xs font-sans font-semibold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-widest uppercase mb-5">
              Properties
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Buy Property",
                "Rent Property",
                "Off-Plan",
                "Commercial",
                "Luxury Collection",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/40 text-sm font-sans hover:text-gold-400 transition-colors duration-200"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-widest uppercase mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {["About Us", "Meet the Team", "Careers", "Blog", "Contact"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/40 text-sm font-sans hover:text-gold-400 transition-colors duration-200"
                    >
                      {l}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-sans font-semibold tracking-widest uppercase mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <svg
                  className="text-gold-400 flex-shrink-0 mt-0.5"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-white/40 text-sm font-sans leading-relaxed">
                  RPH Realty Unit 402, Goa 403001, India
                </span>
              </li>
              <li>
                <a
                  href="tel:+97141234567"
                  className="text-white/40 text-sm font-sans hover:text-gold-400 transition-colors flex gap-3"
                >
                  <svg
                    className="text-gold-400 flex-shrink-0"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  +91 98200 12345
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@fortuneasiarealty.com"
                  className="text-white/40 text-sm font-sans hover:text-gold-400 transition-colors flex gap-3 break-all"
                >
                  <svg
                    className="text-gold-400 flex-shrink-0"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  info@royalprimehomes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs font-sans">
            © {new Date().getFullYear()} RPH Realty. All rights
            reserved. RERA Licensed.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-white/25 text-xs font-sans hover:text-white/50 transition-colors duration-200"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
