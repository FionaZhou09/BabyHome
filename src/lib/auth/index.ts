import { NextResponse, type NextRequest } from "next/server";

export interface LocalUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export type AuthResult =
  | { ok: true; user: LocalUser }
  | { ok: false; response: NextResponse };

export function requireAuth(_request: NextRequest): AuthResult {
  void _request;
  return {
    ok: true,
    user: {
      id: "local-user",
      email: "local@babyhome.app",
      name: "Local Parent",
      avatarUrl: null,
    },
  };
}
