export const allLocations = [
  { city: "Cleveland", state: "Ohio" },
  { city: "Columbus", state: "Ohio" },
  { city: "Cincinnati", state: "Ohio" },
  { city: "Dayton", state: "Ohio" },
  { city: "Toledo", state: "Ohio" },
  { city: "Akron", state: "Ohio" },
  { city: "Canton", state: "Ohio" },
  { city: "Richmond", state: "Virginia" },
  { city: "Virginia Beach", state: "Virginia" },
  { city: "Norfolk", state: "Virginia" },
  { city: "Chesapeake", state: "Virginia" },
  { city: "Newport News", state: "Virginia" },
  { city: "Alexandria", state: "Virginia" },
  { city: "Hampton", state: "Virginia" },
];

export const states = [...new Set(allLocations.map(location => location.state))];