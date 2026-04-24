"use client";

import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AuthGuard({ children }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate({ to: "/" });
    }
  }, []);

  return children;
}