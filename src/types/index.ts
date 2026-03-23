export interface Plot {
  number: number;
  areaSqft: number;
  cost: number;
  highlight?: string;
}

export interface Member {
  id: string;
  name: string;
}

export interface Allocation {
  member: Member;
  plot: Plot;
}

export interface DrawState {
  allocations: Allocation[];
  isLocked: boolean;
  lockedAt?: string;
}
