"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      router.push("/login");
    }
  }, [isClient, router]);

  return null;
};

export default HomePage;
