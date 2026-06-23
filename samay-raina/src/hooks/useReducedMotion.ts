"use client";

import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  // Always return false to force animations as requested by the user
  return false;
}
