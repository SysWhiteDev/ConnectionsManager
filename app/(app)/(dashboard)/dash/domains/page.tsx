"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
export default function DomainsPage(): React.JSX.Element {
  const supabase = createClient();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
      } else {
        setUserData(data);
      }
    };

    fetchUserData();
  }, [supabase.auth]);

  const logOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="text-text flex items-center h-[calc(100dvh-117px)] justify-center flex-col">
      <p className="text-2xl font-semibold">Domains</p>
      <p className="text-sm opacity-75 mt-1.5">Still under construction</p>
    </div>
  );
}
