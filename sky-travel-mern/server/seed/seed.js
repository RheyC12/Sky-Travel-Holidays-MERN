// Seeds the database with the destinations, testimonials and offices that
// were hardcoded in the original static HTML template, plus one admin account.
// Run with:  npm run seed        (populate)
//            npm run seed:destroy (wipe collections)
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Country from "../models/Country.js";
import Testimonial from "../models/Testimonial.js";
import Office from "../models/Office.js";

dotenv.config();
connectDB();

const countries = [
  {
    name: "United States",
    slug: "united-states",
    region: "Americas",
    summary: "Tourist and business visa processing for the USA.",
    visaTypesOffered: ["Tourist", "Business", "Transit"],
    processingTimeDays: 15,
    baseFee: 450,
    requiredDocuments: ["Passport copy", "Passport photo", "Proof of funds", "Travel itinerary"],
    image: "usa.jpg",
  },
  {
    name: "India",
    slug: "india",
    region: "Asia",
    summary: "e-Visa and business visa support for India.",
    visaTypesOffered: ["Tourist", "Business", "e-Visa"],
    processingTimeDays: 5,
    baseFee: 180,
    requiredDocuments: ["Passport copy", "Passport photo", "Return ticket"],
    image: "india.jpg",
  },
  {
    name: "Brazil",
    slug: "brazil",
    region: "Americas",
    summary: "Tourist visa processing for Brazil.",
    visaTypesOffered: ["Tourist", "Business"],
    processingTimeDays: 10,
    baseFee: 220,
    requiredDocuments: ["Passport copy", "Passport photo", "Proof of accommodation"],
    image: "brazil.jpg",
  },
  {
    name: "Italy",
    slug: "italy",
    region: "Europe",
    summary: "Schengen visa processing for Italy.",
    visaTypesOffered: ["Schengen Tourist", "Business"],
    processingTimeDays: 12,
    baseFee: 300,
    requiredDocuments: ["Passport copy", "Passport photo", "Travel insurance", "Bank statement"],
    image: "italy.jpg",
  },
  {
    name: "Georgia",
    slug: "georgia",
    region: "Asia",
    summary: "Visa change and tourist packages for Georgia.",
    visaTypesOffered: ["Tourist", "Visa Change"],
    processingTimeDays: 3,
    baseFee: 150,
    requiredDocuments: ["Passport copy", "Passport photo"],
    image: "Georgia.jpg",
  },
  {
    name: "Armenia",
    slug: "armenia",
    region: "Asia",
    summary: "Visa change combined with holiday packages for Armenia.",
    visaTypesOffered: ["Tourist", "Visa Change"],
    processingTimeDays: 3,
    baseFee: 150,
    requiredDocuments: ["Passport copy", "Passport photo"],
    image: "Armenia.jpg",
  },
  {
    name: "Kazakhstan",
    slug: "kazakhstan",
    region: "Asia",
    summary: "Visa change processing for Kazakhstan.",
    visaTypesOffered: ["Tourist", "Visa Change"],
    processingTimeDays: 5,
    baseFee: 170,
    requiredDocuments: ["Passport copy", "Passport photo"],
    image: "Kazakhstan.jpg",
  },
  {
    name: "Oman",
    slug: "oman",
    region: "Middle East",
    summary: "Overland (bus) visa-change trips to Oman.",
    visaTypesOffered: ["Tourist", "Visa Change"],
    processingTimeDays: 2,
    baseFee: 120,
    requiredDocuments: ["Passport copy", "Passport photo"],
    image: "Oman by bus.jpg",
  },
];

const testimonials = [
  {
    name: "Ahmed Al Farsi",
    role: "Business Traveler",
    message: "Sky Travel Holidays handled my visa change trip to Oman flawlessly - fast, transparent, and stress-free.",
    rating: 5,
    image: "testimonial-1.jpg",
  },
  {
    name: "Priya Nair",
    role: "Tourist",
    message: "Got my India e-Visa support and full holiday package sorted in days. Excellent communication throughout.",
    rating: 5,
    image: "testimonial-2.jpg",
  },
  {
    name: "Carlos Mendes",
    role: "Family Traveler",
    message: "Professional team, clear document checklist, and they kept me updated on every status change.",
    rating: 4,
    image: "testimonial-3.jpg",
  },
];

const offices = [
  {
    country: "United Arab Emirates",
    address: "Beside Megamall, 2XL Building, 4th Floor, Room 4040, Sharjah, UAE",
    phone: "+971 6 921 007",
    email: "info@skytravelholidaysfz.com",
    image: "office-1.jpg",
  },
  {
    country: "United Kingdom",
    address: "123 First Floor, St Roots Terrace, London",
    phone: "01234 567 890",
    email: "visa@example.com",
    image: "office-3.jpg",
  },
  {
    country: "India",
    address: "123 First Floor, St Roots Terrace, Mumbai",
    phone: "+123 45 67890",
    email: "visa@example.com",
    image: "office-4.jpg",
  },
];

const importData = async () => {
  try {
    await Country.deleteMany();
    await Testimonial.deleteMany();
    await Office.deleteMany();

    await Country.insertMany(countries);
    await Testimonial.insertMany(testimonials);
    await Office.insertMany(offices);

    const adminExists = await User.findOne({ email: "admin@skytravelholidaysfz.com" });
    if (!adminExists) {
      await User.create({
        name: "Sky Travel Admin",
        email: "admin@skytravelholidaysfz.com",
        password: "ChangeMe123!",
        role: "admin",
      });
      console.log("Admin user created: admin@skytravelholidaysfz.com / ChangeMe123! (change this immediately)");
    }

    console.log("Data imported successfully");
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Country.deleteMany();
    await Testimonial.deleteMany();
    await Office.deleteMany();
    console.log("Data destroyed successfully");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
