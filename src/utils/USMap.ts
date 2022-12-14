import { State } from "../customTypes";

export const allStates: State[] = [
  { id: "AL", val: "01", fullName: "Alabama" },
  { id: "AK", val: "02", fullName: "Alaska" },
  { id: "AZ", val: "04", fullName: "Arizona" },
  { id: "AR", val: "05", fullName: "Arkansas" },
  { id: "CA", val: "06", fullName: "California" },
  { id: "CO", val: "08", fullName: "Colorado" },
  { id: "CT", val: "09", fullName: "Connecticut" },
  { id: "DE", val: "10", fullName: "Delaware" },
  { id: "DC", val: "11", fullName: "Washington D.C." },
  { id: "FL", val: "12", fullName: "Florida" },
  { id: "GA", val: "13", fullName: "Georgia" },
  { id: "HI", val: "15", fullName: "Hawaii" },
  { id: "ID", val: "16", fullName: "Idaho" },
  { id: "IL", val: "17", fullName: "Illinois" },
  { id: "IN", val: "18", fullName: "Indiana" },
  { id: "IA", val: "19", fullName: "Iowa" },
  { id: "KS", val: "20", fullName: "Kansas" },
  { id: "KY", val: "21", fullName: "Kentucky" },
  { id: "LA", val: "22", fullName: "Louisiana" },
  { id: "ME", val: "23", fullName: "Maine" },
  { id: "MD", val: "24", fullName: "Maryland" },
  { id: "MA", val: "25", fullName: "Massachusetts" },
  { id: "MI", val: "26", fullName: "Michigan" },
  { id: "MN", val: "27", fullName: "Minnesota" },
  { id: "MS", val: "28", fullName: "Mississippi" },
  { id: "MO", val: "29", fullName: "Missouri" },
  { id: "MT", val: "30", fullName: "Montana" },
  { id: "NE", val: "31", fullName: "New England" },
  { id: "NV", val: "32", fullName: "Nevada" },
  { id: "NH", val: "33", fullName: "New Hampshire" },
  { id: "NJ", val: "34", fullName: "New Jersey" },
  { id: "NM", val: "35", fullName: "New Mexico" },
  { id: "NY", val: "36", fullName: "New York" },
  { id: "NC", val: "37", fullName: "North Carolina" },
  { id: "ND", val: "38", fullName: "North Dakota" },
  { id: "OH", val: "39", fullName: "Ohio" },
  { id: "OK", val: "40", fullName: "Oklahoma" },
  { id: "OR", val: "41", fullName: "Oregon" },
  { id: "PA", val: "42", fullName: "Pennsylvania" },
  { id: "RI", val: "44", fullName: "Rhode Island" },
  { id: "SC", val: "45", fullName: "South Carolina" },
  { id: "SD", val: "46", fullName: "South Dakota" },
  { id: "TN", val: "47", fullName: "Tennessee" },
  { id: "TX", val: "48", fullName: "Texas" },
  { id: "UT", val: "49", fullName: "Utah" },
  { id: "VT", val: "50", fullName: "Vermont" },
  { id: "VA", val: "51", fullName: "Virginia" },
  { id: "WA", val: "53", fullName: "Washington (State)" },
  { id: "WV", val: "54", fullName: "West Virginia" },
  { id: "WI", val: "55", fullName: "Wisconsin" },
  { id: "WY", val: "56", fullName: "Wyoming" },
];

export const getStateNameFromVal = (stateVal: string) => {
  const result = allStates.find((s) => s.val === stateVal);
  return result?.fullName || "";
};
