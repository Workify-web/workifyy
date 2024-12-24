// export const Heronavigation = [
//   { name: "Sign Up", href: "/signup" },
//   { name: "Log In", href: "/signin" },
//   { name: "Explore", href: "" },
// ];

export const ProfessionalFormNav = [
  { name: "Here to hire Professional?", to: "" },
  { name: "Join as Client", to: "/Clientsignup" },
];

export const ClientFormNav = [
  { name: "Looking for Work?", to: "" },
  { name: "Join as Professional", to: "/Professionalsignup" },
];

export const DashBoardNav = [
  { name: "Bid", to: "" },
  { name: "Jobs", to: "" },
  {
    name: "Wallet",
    dropdown: ["balance", "Fund Account", "Wallet History"],
    to: "",
  },
  {
    name: "Notification",
    dropdown: [
      {
        Title: "Notification 3",
        to: "",
      },
      {
        Title: "Notification 2",
        to: "",
      },
      {
        Title: "Notification 1",
        to: "",
      },
    ],
  },
];

export const ClientDashBoardNav = [
  { name: "Jobs", to: "" },
  { name: "Bid", to: "" },
  { name: "Wallet", to: "" },
  {
    name: "Notification",
    dropdown: [
      {
        Title: "Notification 3",
        description: "6/3/2024, 10:00:00 AM",
        to: "",
      },
      {
        Title: "Notification 2",
        description: "6/3/2024, 10:00:00 AM",
        to: "",
      },
      {
        Title: "Notification 1",
        description: "6/3/2024, 10:00:00 AM",
        to: "",
      },
    ],
  },
];

const statesList: string[] = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];