"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Mic,
  BookOpen,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/login")
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/mock-interview");
    router.refresh();
  }

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isStandalone = pathname.startsWith("/teacher-ops");

  if (isStandalone) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/mock-interview" className="flex items-center gap-2 font-bold text-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span>
            模拟<span className="text-brand-600">面试</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {user && (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 transition hover:text-brand-600 ${
                  pathname.startsWith("/dashboard") ? "text-brand-600" : ""
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                我的面试
              </Link>
              <Link
                href="/session/new"
                className={`flex items-center gap-1.5 transition hover:text-brand-600 ${
                  pathname === "/session/new" ? "text-brand-600" : ""
                }`}
              >
                <BookOpen className="h-4 w-4" />
                新建准备
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <>
              <span className="hidden text-sm text-slate-600 sm:inline">
                {user.name}
              </span>
              <button onClick={logout} className="btn-secondary !py-2 !px-3">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">退出</span>
              </button>
            </>
          ) : (
            !isAuthPage && (
              <>
                <Link href="/login" className="btn-secondary !py-2 !px-3">
                  <LogIn className="h-4 w-4" />
                  登录
                </Link>
                <Link href="/register" className="btn-primary !py-2 !px-3">
                  <UserPlus className="h-4 w-4" />
                  注册
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
