"use client";

import { create } from "zustand";
import { User as UserPrisma } from "@prisma/client";

export type UserSession = Omit<UserPrisma, "password">;

export type Session = {
    user: UserSession | null;
    isLoading: boolean;
    error: string | null;
};

interface SessionStore {
    session: Session;
    setSession: (session: Session) => void;
    refreshSession: () => Promise<void>;
    clearSession: () => void;
}

export const useSession = create<SessionStore>((set) => ({
    session: {
        user: null,
        isLoading: true,
        error: null,
    },
    setSession: (session) => set({ session }),
    refreshSession: async () => {
        try {
            set((state) => ({
                session: { ...state.session, isLoading: true, error: null },
            }));

            const response = await fetch("/api/auth/session");
            if (!response.ok) throw new Error("Failed to fetch session");

            const data = await response.json();
            set({
                session: {
                    user: data.user,
                    isLoading: false,
                    error: null,
                },
            });
        } catch (error) {
            set((state) => ({
                session: {
                    ...state.session,
                    isLoading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Failed to fetch session",
                },
            }));
        }
    },
    clearSession: () =>
        set({
            session: {
                user: null,
                isLoading: false,
                error: null,
            },
        }),
}));
