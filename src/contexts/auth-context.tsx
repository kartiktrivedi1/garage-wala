"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, hasFirebaseConfig } from "@/lib/firebase";

export type UserRole = "customer" | "garage" | "admin";

export interface AppUser {
  uid: string;
  name: string | null;
  email: string | null;
  role: UserRole;
}

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  configured: boolean;
  signUp: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logInWithGoogle: (role: UserRole) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Local fallback role store so role-based routing still works in demo/dev
// mode before Firestore is wired to a real project.
const ROLE_KEY = "garagewala_role";

function readLocalRole(): UserRole {
  if (typeof window === "undefined") return "customer";
  return (window.localStorage.getItem(ROLE_KEY) as UserRole) || "customer";
}

export function getStoredRole(): UserRole {
  return readLocalRole();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (fbUser: User | null) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          name: fbUser.displayName,
          email: fbUser.email,
          role: readLocalRole(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      configured: hasFirebaseConfig,
      async signUp(name, email, password, role) {
        if (!hasFirebaseConfig || !auth) {
          throw new Error(
            "Firebase isn't configured yet. Add your keys to .env.local (see .env.example)."
          );
        }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        if (db) {
          await setDoc(doc(db, "users", cred.user.uid), {
            name,
            email,
            role,
            createdAt: serverTimestamp(),
          });
        }
        window.localStorage.setItem(ROLE_KEY, role);
        setUser({ uid: cred.user.uid, name, email, role });
      },
      async logIn(email, password) {
        if (!hasFirebaseConfig || !auth) {
          throw new Error(
            "Firebase isn't configured yet. Add your keys to .env.local (see .env.example)."
          );
        }
        await signInWithEmailAndPassword(auth, email, password);
      },
      async logInWithGoogle(role) {
        if (!hasFirebaseConfig || !auth) {
          throw new Error(
            "Firebase isn't configured yet. Add your keys to .env.local (see .env.example)."
          );
        }
        const provider = new GoogleAuthProvider();
        const cred = await signInWithPopup(auth, provider);
        if (db) {
          await setDoc(
            doc(db, "users", cred.user.uid),
            {
              name: cred.user.displayName,
              email: cred.user.email,
              role,
              createdAt: serverTimestamp(),
            },
            { merge: true }
          );
        }
        window.localStorage.setItem(ROLE_KEY, role);
      },
      async resetPassword(email) {
        if (!hasFirebaseConfig || !auth) {
          throw new Error(
            "Firebase isn't configured yet. Add your keys to .env.local (see .env.example)."
          );
        }
        await sendPasswordResetEmail(auth, email);
      },
      async logOut() {
        if (auth) await firebaseSignOut(auth);
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
