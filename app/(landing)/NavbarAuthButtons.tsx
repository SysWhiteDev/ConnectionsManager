/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function NavbarAuthButtons(): React.ReactElement {
  const supabase = createClient();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      setUser((await supabase.auth.getUser()).data.user);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <Link
            href={"/dash"}
            className="bg-accent hover:bg-opacity-90 shadow rounded-md text-black font-semibold text-sm flex justify-center items-center px-2.5 py-1"
          >
            Open Dashboard
          </Link>
        </>
      ) : (
        <>
          <Link
            href={"/auth?type=login"}
            className="opacity-90 text-secondary hover:underline"
          >
            Login
          </Link>
          <Link
            href={"/auth?type=register"}
            className="bg-accent hover:bg-opacity-90 shadow rounded-md text-black font-semibold text-sm flex justify-center items-center px-2.5 py-1"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
}
