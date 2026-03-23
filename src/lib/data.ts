import { Plot, Member } from "@/types";

export const RATE_PER_SQFT = 1125;

export const PLOTS: Plot[] = [
  { number: 221, areaSqft: 3414, cost: 3414 * RATE_PER_SQFT, highlight: "yellow" },
  { number: 222, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 223, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 224, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 225, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 226, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 227, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
  { number: 228, areaSqft: 3089, cost: 3089 * RATE_PER_SQFT },
];

export const MEMBERS: Member[] = [
  { id: "MS-117", name: "Vinod Mittal" },
  { id: "MS-150", name: "Kunal Chandra" },
  { id: "MS-151", name: "Pavan Kumar Trivedi" },
  { id: "MS-152", name: "Pranab Rohatgi" },
  { id: "MS-153", name: "Sameer Shashwat" },
  { id: "MS-154", name: "Rajesh Kumar" },
  { id: "MS-160", name: "Abhinav Shyam" },
  { id: "MS-161", name: "Abhishk Sinha" },
];

// Pre-assigned: Sameer gets Plot 221
export const SAMEER = MEMBERS.find((m) => m.id === "MS-153")!;
export const PLOT_221 = PLOTS.find((p) => p.number === 221)!;
export const LOTTERY_PLOTS = PLOTS.filter((p) => p.number !== 221);
export const LOTTERY_MEMBERS = MEMBERS.filter((m) => m.id !== "MS-153");

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
