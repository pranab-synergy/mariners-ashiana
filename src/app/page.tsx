"use client";

import { useState, useEffect, useCallback } from "react";
import { Allocation } from "@/types";
import {
  PLOTS,
  MEMBERS,
  SAMEER,
  PLOT_221,
  LOTTERY_PLOTS,
  LOTTERY_MEMBERS,
} from "@/lib/data";
import { fisherYatesShuffle } from "@/lib/shuffle";
import { saveDrawState, loadDrawState, clearDrawState, DrawMode } from "@/lib/storage";
import Header from "@/components/Header";
import PlotImages from "@/components/PlotImages";
import DrawControls from "@/components/DrawControls";
import AllocationTable from "@/components/AllocationTable";
import ConfirmationBanner from "@/components/ConfirmationBanner";

type Tab = "full" | "partial";

function useDrawState(mode: DrawMode, buildAllocations: () => Allocation[]) {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockedAt, setLockedAt] = useState<string | undefined>();
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const saved = loadDrawState(mode);
    if (saved?.isLocked) {
      setAllocations(saved.allocations);
      setIsLocked(true);
      setLockedAt(saved.lockedAt);
      setHasDrawn(true);
    } else {
      setAllocations([]);
      setIsLocked(false);
      setLockedAt(undefined);
      setHasDrawn(false);
    }
  }, [mode]);

  const handleDraw = useCallback(() => {
    setAllocations(buildAllocations());
    setHasDrawn(true);
  }, [buildAllocations]);

  const handleConfirm = useCallback(() => {
    const confirmed = window.confirm(
      "Are you sure you want to lock this allocation? This cannot be undone."
    );
    if (!confirmed) return;
    const now = new Date().toISOString();
    setIsLocked(true);
    setLockedAt(now);
    saveDrawState(mode, { allocations, isLocked: true, lockedAt: now });
  }, [mode, allocations]);

  const handleUnlock = useCallback(() => {
    const password = window.prompt("Enter admin password to unlock:");
    if (password === null) return;
    if (password !== "admin@015") {
      window.alert("Incorrect password.");
      return;
    }
    clearDrawState(mode);
    setAllocations([]);
    setIsLocked(false);
    setLockedAt(undefined);
    setHasDrawn(false);
  }, [mode]);

  return { allocations, isLocked, lockedAt, hasDrawn, handleDraw, handleConfirm, handleUnlock };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("full");

  const buildFullAllocations = useCallback((): Allocation[] => {
    const shuffled = fisherYatesShuffle(MEMBERS);
    return PLOTS.map((plot, i) => ({ member: shuffled[i], plot }));
  }, []);

  const buildPartialAllocations = useCallback((): Allocation[] => {
    const fixed: Allocation = { member: SAMEER, plot: PLOT_221 };
    const shuffled = fisherYatesShuffle(LOTTERY_MEMBERS);
    const rest = LOTTERY_PLOTS.map((plot, i) => ({ member: shuffled[i], plot }));
    return [fixed, ...rest];
  }, []);

  const full = useDrawState("full", buildFullAllocations);
  const partial = useDrawState("partial", buildPartialAllocations);
  const current = activeTab === "full" ? full : partial;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 pb-12">
        {/* Tabs */}
        <div className="flex justify-center gap-2 pt-6 pb-2 print:hidden">
          <button
            onClick={() => setActiveTab("full")}
            className={`px-5 py-2 rounded-t-lg font-medium text-sm transition-colors ${
              activeTab === "full"
                ? "bg-white text-indigo-700 border border-b-0 border-gray-200"
                : "bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            Full Lottery (All 8)
          </button>
          <button
            onClick={() => setActiveTab("partial")}
            className={`px-5 py-2 rounded-t-lg font-medium text-sm transition-colors ${
              activeTab === "partial"
                ? "bg-white text-indigo-700 border border-b-0 border-gray-200"
                : "bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            Sameer → 221, Lottery for Rest
          </button>
        </div>

        {/* Tab description */}
        <p className="text-center text-sm text-gray-500 mb-4">
          {activeTab === "full"
            ? "All 8 members randomly assigned to all 8 plots."
            : "Plot 221 is pre-assigned to Sameer Shashwat. Remaining 7 plots drawn for 7 members."}
        </p>

        <DrawControls
          onDraw={current.handleDraw}
          onConfirm={current.handleConfirm}
          onUnlock={current.handleUnlock}
          isLocked={current.isLocked}
          hasDrawn={current.hasDrawn}
        />
        <AllocationTable
          allocations={current.allocations}
          isLocked={current.isLocked}
        />
        {current.isLocked && current.lockedAt && (
          <ConfirmationBanner lockedAt={current.lockedAt} />
        )}

        {/* Images moved below the lottery */}
        <PlotImages />
      </main>
    </div>
  );
}
