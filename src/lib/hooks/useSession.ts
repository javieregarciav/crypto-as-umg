"use client";

import { useEffect } from "react";
import { create } from "zustand";
import type { User } from "@/lib/domain/types";
import { services } from "@/lib/services";

interface SessionState {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  loading: true,
  async refresh() {
    set({ loading: true });
    const user = await services.auth.currentUser();
    set({ user, loading: false });
  },
  async logout() {
    await services.auth.logout();
    set({ user: null });
  },
}));

export function useSession() {
  const state = useSessionStore();
  useEffect(() => {
    if (state.loading && !state.user) {
      void state.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}
