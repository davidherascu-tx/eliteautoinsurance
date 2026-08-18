/**
 * Single source of truth for company details, locations and coverage lines.
 * Update this file to change phone numbers, hours or copy across the whole site.
 */

export const site = {
  name: "Elite Auto Insurance",
  shortName: "Elite Auto",
  tagline: "We're covering all the insurance fields",
  description:
    "Independent Houston insurance agency offering auto, property, commercial, trucking, boat, umbrella and life insurance. Se habla español. Get a free quote today.",
  // Netlify serves the bare domain and 301s www to it, so canonical URLs,
  // the sitemap and og:url must use the bare form or they all point at a redirect.
  url: "https://eliteautoinsurance.net",
  email: "quote@eliteautoinsurance.net",
  phone: "(713) 644-8000",
  phoneHref: "tel:+17136448000",
  facebook: "https://www.facebook.com/eliteautoinsurancehtx",
  areaServed: "Houston, Hockley and the Greater Houston area",
} as const;

export type Location = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneHref: string;
  hours: { days: string; time: string }[];
};

export const locations: Location[] = [
  {
    id: "howard",
    name: "Houston — Howard Dr.",
    street: "8234 Howard Dr.",
    city: "Houston",
    state: "TX",
    zip: "77017",
    phone: "(713) 644-8000",
    phoneHref: "tel:+17136448000",
    hours: [
      { days: "Monday", time: "9:00am – 6:00pm" },
      { days: "Tuesday – Thursday", time: "9:00am – 5:00pm" },
      { days: "Friday", time: "9:00am – 6:00pm" },
    ],
  },
  {
    id: "long-point",
    name: "Houston — Long Point",
    street: "9610 Long Point, Suite 210",
    city: "Houston",
    state: "TX",
    zip: "77055",
    phone: "(281) 847-4200",
    phoneHref: "tel:+12818474200",
    hours: [{ days: "Monday – Friday", time: "9:00am – 5:00pm" }],
  },
  {
    id: "hockley",
    name: "Hockley — Roberts Rd.",
    street: "17403 Roberts Rd, Suite 1",
    city: "Hockley",
    state: "TX",
    zip: "77447",
    phone: "(832) 626-1005",
    phoneHref: "tel:+18326261005",
    hours: [
      { days: "Monday – Friday", time: "10:00am – 6:00pm" },
      { days: "Saturday", time: "10:00am – 2:00pm" },
    ],
  },
];

export function mapsUrl(location: Location) {
  const query = `${location.street}, ${location.city}, ${location.state} ${location.zip}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export type CoverageLine = {
  slug: string;
  name: string;
  navLabel: string;
  headline: string;
  summary: string;
  /** Short blurb used on the home page cards. */
  cardText: string;
  /** Very short blurb for the navigation mega-menu. */
  menuText: string;
  heroImage: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  heroImageAlt: string;
  /**
   * Optional wide image for social cards. Social platforms crop to about 1.91:1,
   * so a line whose hero photo is square or portrait can point here instead.
   * Falls back to `heroImage`.
   */
  ogImage?: string;
  /** What the policy typically covers. */
  covers: { title: string; text: string }[];
  /** Reasons to buy, shown as a checklist. */
  highlights: string[];
  faqs: { q: string; a: string }[];
};

export const coverageLines: CoverageLine[] = [
  {
    slug: "auto",
    name: "Auto Insurance",
    navLabel: "Auto",
    headline: "Texas auto coverage that keeps you legal and protected",
    summary:
      "From state-minimum liability to full coverage with roadside assistance, we shop multiple carriers to find the price and protection that fit how you actually drive.",
    cardText:
      "Liability, collision, comprehensive and SR-22 filings — quoted across multiple carriers in minutes.",
    menuText: "Liability, full coverage and SR-22 filings",
    heroImage: "/auto_insurance.jpg",
    heroImageAlt: "View from the driver's seat of a car on a Houston road",
    secondaryImage: "/auto_insurance_crash.jpg",
    secondaryImageAlt: "Damaged vehicle after a collision",
    covers: [
      {
        title: "Liability",
        text: "Pays for injuries and property damage you cause to others. Texas requires 30/60/25 minimum limits.",
      },
      {
        title: "Collision",
        text: "Repairs or replaces your vehicle after an accident, no matter who was at fault.",
      },
      {
        title: "Comprehensive",
        text: "Covers hail, flood, theft, vandalism, fire and falling objects — the things Houston weather does best.",
      },
      {
        title: "Uninsured motorist",
        text: "Protects you when the other driver has no insurance or not nearly enough of it.",
      },
      {
        title: "Roadside & rental",
        text: "Towing, lockout service and a rental car while your vehicle is in the shop.",
      },
      {
        title: "SR-22 filings",
        text: "We file the certificate with the state the same day so you can get your license reinstated.",
      },
    ],
    highlights: [
      "Same-day proof of insurance emailed or texted to you",
      "Multi-car, homeowner and safe-driver discounts applied automatically",
      "Monthly payment plans with low down payments",
      "SR-22 and non-owner policies available",
    ],
    faqs: [
      {
        q: "What is the minimum auto insurance required in Texas?",
        a: "Texas requires 30/60/25 liability coverage: $30,000 per injured person, $60,000 per accident, and $25,000 for property damage. We can quote the minimum or higher limits side by side so you can see the real cost difference.",
      },
      {
        q: "Can I get insured without a Texas license?",
        a: "In many cases yes. Bring what you have — a foreign license, matrícula or passport — and we will find a carrier that can write the policy.",
      },
      {
        q: "How fast can I get covered?",
        a: "Most auto policies can start the same day. Call us or send the quote form and we will confirm coverage before you leave.",
      },
    ],
  },
  {
    slug: "property",
    name: "Property Insurance",
    navLabel: "Property",
    headline: "Home, condo and rental property coverage built for the Gulf Coast",
    summary:
      "Wind, hail and flood behave differently in Harris County than anywhere else. We write policies that account for that instead of leaving you to find out after the storm.",
    cardText:
      "Homeowners, condo, renters and landlord policies — with windstorm and flood options.",
    menuText: "Home, condo, renters and landlord",
    heroImage: "/property_insurance.jpg",
    heroImageAlt: "Two-story suburban home at dusk",
    secondaryImage: "/property_insurance_burning_house.jpg",
    secondaryImageAlt: "House damaged by fire",
    covers: [
      {
        title: "Dwelling",
        text: "Rebuilds the structure of your home after a covered loss such as fire, hail or wind.",
      },
      {
        title: "Personal property",
        text: "Replaces furniture, electronics, clothing and belongings inside the home.",
      },
      {
        title: "Liability",
        text: "Covers injuries to guests and damage you accidentally cause to someone else's property.",
      },
      {
        title: "Loss of use",
        text: "Pays for a hotel and meals while your home is uninhabitable during repairs.",
      },
      {
        title: "Windstorm & hail",
        text: "Separate or endorsed coverage for named storms — critical along the Texas coast.",
      },
      {
        title: "Flood",
        text: "Standard home policies exclude flood. We write separate NFIP and private flood policies.",
      },
    ],
    highlights: [
      "Landlord and renters policies quoted the same day",
      "Bundle with auto for a multi-policy discount",
      "Replacement cost options so you are not paid depreciated value",
      "Coverage reviews before hurricane season",
    ],
    faqs: [
      {
        q: "Does homeowners insurance cover flooding?",
        a: "No. Flood damage is excluded from every standard homeowners policy in Texas and needs a separate flood policy. We write both NFIP and private flood coverage, and there is typically a 30-day waiting period, so do not wait for a storm in the Gulf.",
      },
      {
        q: "Do I need windstorm coverage in Houston?",
        a: "It depends on your exact address. Some coastal areas require a separate TWIA windstorm policy while inland Harris County properties can endorse it. We will check your location and tell you which applies.",
      },
      {
        q: "I rent. Do I really need renters insurance?",
        a: "Your landlord's policy covers the building, not your belongings or your liability. Renters coverage is usually one of the least expensive policies we write.",
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Insurance",
    navLabel: "Commercial",
    headline: "Business coverage for Houston contractors, shops and fleets",
    summary:
      "General liability, commercial auto, property and workers' compensation — packaged so your certificates are ready when a client or a job site asks for them.",
    cardText:
      "General liability, commercial auto, BOP and workers' comp with fast certificate turnaround.",
    menuText: "GL, commercial auto and workers' comp",
    heroImage: "/commercial_insurance.jpg",
    heroImageAlt: "Modern glass office building",
    secondaryImage: "/commercia_insurance_shield.jpg",
    secondaryImageAlt: "Illustration of a protective shield over a business",
    covers: [
      {
        title: "General liability",
        text: "Third-party bodily injury and property damage claims arising from your operations.",
      },
      {
        title: "Commercial auto",
        text: "Trucks, vans and fleets, including hired and non-owned vehicle coverage.",
      },
      {
        title: "Business owners policy",
        text: "Bundles property and liability for shops, offices and restaurants at a lower combined cost.",
      },
      {
        title: "Workers' compensation",
        text: "Medical bills and lost wages for employees injured on the job.",
      },
      {
        title: "Tools & equipment",
        text: "Inland marine coverage for the equipment that travels between job sites.",
      },
      {
        title: "Garage & dealer",
        text: "Specialty programs for repair shops, detailers and used car dealers.",
      },
    ],
    highlights: [
      "Certificates of insurance issued quickly for new contracts",
      "Additional insured endorsements handled for you",
      "Coverage for 1099 subcontractors and seasonal crews",
      "Annual reviews as your payroll and fleet change",
    ],
    faqs: [
      {
        q: "How fast can I get a certificate of insurance?",
        a: "Once the policy is bound, certificates usually go out the same business day. Send us the exact wording your client requires and we will match it.",
      },
      {
        q: "Do I need commercial auto if I use my personal truck for work?",
        a: "Usually yes. Personal auto policies exclude business use, so a claim while you are working can be denied. We can quote a commercial policy or add the right endorsement.",
      },
      {
        q: "Is workers' compensation required in Texas?",
        a: "Texas does not require most private employers to carry it, but many contracts and general contractors do. We can quote it either way.",
      },
    ],
  },
  {
    slug: "trucking",
    name: "Commercial Trucking Insurance",
    navLabel: "Trucking",
    headline: "Trucking coverage that keeps your authority active and your loads moving",
    summary:
      "Primary liability, physical damage and motor truck cargo for owner-operators and small fleets — with federal filings handled and certificates sent the same day.",
    cardText:
      "Primary liability, physical damage, cargo and bobtail for owner-operators and fleets.",
    menuText: "Primary liability, cargo and physical damage",
    heroImage: "/trucking_1.webp",
    heroImageAlt: "Blue semi truck pulling a dry van trailer on a highway",
    // The hero photo is square; this banner crop suits a social card.
    ogImage: "/trucking_banner_1.webp",
    secondaryImage: "/trucking_2.webp",
    secondaryImageAlt: "Flatbed truck hauling a wheel loader at sunset",
    covers: [
      {
        title: "Primary liability",
        text: "The coverage your operating authority is built on — injuries and property damage you cause while on dispatch.",
      },
      {
        title: "Physical damage",
        text: "Repairs or replaces the tractor and trailer after a collision, rollover, fire, hail or theft.",
      },
      {
        title: "Motor truck cargo",
        text: "Pays for the freight itself when a load is damaged, stolen or lost in transit.",
      },
      {
        title: "Non-trucking liability",
        text: "Bobtail and personal-use coverage for the miles you run when you are off dispatch.",
      },
      {
        title: "Trailer interchange",
        text: "Covers damage to trailers you pull under an interchange or lease agreement but do not own.",
      },
      {
        title: "Occupational accident",
        text: "Medical and disability benefits for owner-operators, plus workers' compensation where a contract requires it.",
      },
    ],
    highlights: [
      "FMCSA filings and MCS-90 endorsements handled for you",
      "Certificates of insurance sent to brokers and shippers the same day",
      "New-authority owner-operators placed, not turned away",
      "Reefer breakdown, hazmat and oilfield hauling quoted through specialty carriers",
    ],
    faqs: [
      {
        q: "How much liability coverage does the FMCSA require?",
        a: "For interstate carriers hauling general freight in vehicles over 10,000 pounds, the federal minimum is $750,000 combined single limit. Hazmat runs to $1 million or $5 million depending on the commodity, and most brokers and shippers require $1 million by contract regardless. Texas intrastate limits are set separately and are often lower — we will confirm which applies to your operation.",
      },
      {
        q: "Do I need cargo coverage if the shipper already has insurance?",
        a: "Yes. The shipper's policy protects the shipper, not you, and your liability for the freight follows the bill of lading. Most brokers will not tender a load without at least $100,000 of motor truck cargo coverage on file.",
      },
      {
        q: "Am I covered when I am not under dispatch?",
        a: "Not by your primary liability policy — that coverage applies while you are in the business of the motor carrier. Non-trucking liability, often called bobtail coverage, fills the gap for personal use and deadhead miles.",
      },
    ],
  },
  {
    slug: "boat",
    name: "Boat & Watercraft Insurance",
    navLabel: "Boat",
    headline: "Coverage from Galveston Bay to the lake and back on the trailer",
    summary:
      "Hull damage, liability on the water, trailer coverage and towing — for bass boats, bay boats, sailboats, jet skis and everything in between.",
    cardText:
      "Hull, liability, trailer and on-water towing for boats, sailboats and personal watercraft.",
    menuText: "Hull, trailer and on-water towing",
    heroImage: "/boat_insurance.jpg",
    heroImageAlt: "Sailboat under sail on open water",
    secondaryImage: "/boat_insurance_burning.jpg",
    secondaryImageAlt: "Boat damaged by fire on the water",
    covers: [
      {
        title: "Hull & machinery",
        text: "Physical damage to the boat, motor and permanently attached equipment.",
      },
      {
        title: "Watercraft liability",
        text: "Injuries and property damage you cause to others while operating the boat.",
      },
      {
        title: "Trailer coverage",
        text: "Protects the trailer on the road as well as at the ramp.",
      },
      {
        title: "On-water towing",
        text: "Pays for a tow back to the dock when the engine gives out miles from shore.",
      },
      {
        title: "Fuel spill liability",
        text: "Covers cleanup costs and fines after an accidental discharge.",
      },
      {
        title: "Personal effects",
        text: "Fishing gear, electronics and equipment kept aboard.",
      },
    ],
    highlights: [
      "Lay-up season discounts when the boat is stored",
      "Agreed value options so there is no depreciation argument",
      "Coverage for personal watercraft and jet skis",
      "Bundles with your auto and home policies",
    ],
    faqs: [
      {
        q: "Does my homeowners policy already cover my boat?",
        a: "Only in a very limited way — typically small boats with low horsepower, and usually only while on your property. Anything larger needs its own policy.",
      },
      {
        q: "Am I covered in the Gulf?",
        a: "Boat policies define a navigational territory. We will set yours to match where you actually run, whether that is Clear Lake, Galveston Bay or offshore.",
      },
      {
        q: "Is my trailer covered by my auto policy?",
        a: "Your auto liability extends to a trailer in tow, but damage to the trailer itself usually needs to be scheduled on the boat policy.",
      },
    ],
  },
  {
    slug: "umbrella",
    name: "Umbrella Insurance",
    navLabel: "Umbrella",
    headline: "Extra liability limits for when a claim goes past your policy",
    summary:
      "An umbrella policy sits on top of your auto, home and boat coverage and adds $1 million or more of liability protection for a surprisingly small premium.",
    cardText:
      "$1M+ of extra liability protection layered over your auto, home and boat policies.",
    menuText: "$1M+ over your existing policies",
    heroImage: "/umprella_insurance.jpg",
    heroImageAlt: "Person holding a bright umbrella in the rain",
    secondaryImage: "/umbrella_insurance_rain.jpg",
    secondaryImageAlt: "Umbrella sheltering from heavy rainfall",
    covers: [
      {
        title: "Excess auto liability",
        text: "Picks up where your auto limits stop after a serious at-fault accident.",
      },
      {
        title: "Excess home liability",
        text: "Extends the liability limit on your homeowners or renters policy.",
      },
      {
        title: "Excess watercraft liability",
        text: "Adds limits over your boat policy for accidents on the water.",
      },
      {
        title: "Legal defense costs",
        text: "Attorney fees are generally paid in addition to your limit, not out of it.",
      },
      {
        title: "Libel & slander",
        text: "Personal injury offenses that standard policies often exclude.",
      },
      {
        title: "Rental property liability",
        text: "Covers claims arising from properties you own and rent out.",
      },
    ],
    highlights: [
      "Often just a few hundred dollars a year for $1 million of protection",
      "Protects savings, home equity and future wages from a judgment",
      "Required underlying limits reviewed and adjusted for you",
      "Available once your auto and home limits qualify",
    ],
    faqs: [
      {
        q: "Who actually needs an umbrella policy?",
        a: "Anyone with assets or future income worth protecting — homeowners, landlords, business owners, and families with teen drivers, a pool or a dog. A single at-fault injury claim can easily exceed a standard liability limit.",
      },
      {
        q: "What does it cost?",
        a: "For most households the first $1 million costs less than a car payment for the year. We will quote it alongside your auto and home renewal.",
      },
      {
        q: "Do I need my other policies with you?",
        a: "Not always, but carriers require minimum underlying limits on your auto and home policies. We will check yours and tell you what needs to change.",
      },
    ],
  },
  {
    slug: "life",
    name: "Life Insurance",
    navLabel: "Life",
    headline: "Make sure the people who depend on you keep their footing",
    summary:
      "Term, whole life and final expense coverage explained in plain language, with no obligation and no pressure — just the numbers that make sense for your family.",
    cardText:
      "Term, whole life and final expense plans sized to your income, mortgage and family.",
    menuText: "Term, whole life and final expense",
    heroImage: "/life_insurance.jpg",
    heroImageAlt: "Young family sitting together at home",
    secondaryImage: "/life_insurance_family.jpg",
    secondaryImageAlt: "Parents and children spending time together",
    covers: [
      {
        title: "Term life",
        text: "The most affordable option — level coverage for 10, 20 or 30 years while the mortgage and kids are still there.",
      },
      {
        title: "Whole life",
        text: "Permanent coverage that builds cash value you can borrow against later.",
      },
      {
        title: "Final expense",
        text: "Smaller policies designed to cover funeral costs and outstanding bills.",
      },
      {
        title: "Mortgage protection",
        text: "Coverage sized to pay off the house so your family can stay in it.",
      },
      {
        title: "Income replacement",
        text: "Replaces the paycheck your household depends on for the years it is needed.",
      },
      {
        title: "Child riders",
        text: "Adds a small amount of coverage for children to an existing policy.",
      },
    ],
    highlights: [
      "No-exam options available for many applicants",
      "Coverage that stays level while your premium stays level",
      "Beneficiary paperwork walked through with you",
      "Reviews after a marriage, birth or new mortgage",
    ],
    faqs: [
      {
        q: "How much life insurance do I need?",
        a: "A common starting point is 10 times your annual income plus the mortgage balance and anticipated education costs. We will work through your actual numbers rather than a rule of thumb.",
      },
      {
        q: "Term or whole life?",
        a: "Term costs far less and covers the years your family is most exposed. Whole life costs more but never expires and builds cash value. Many families use a mix of both.",
      },
      {
        q: "Do I have to take a medical exam?",
        a: "Not always. Several carriers offer simplified-issue policies with health questions only, which can be approved in days.",
      },
    ],
  },
];

export function getCoverageLine(slug: string) {
  return coverageLines.find((line) => line.slug === slug);
}

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
