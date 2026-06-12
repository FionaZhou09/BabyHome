import { request } from "./request";

export interface LocalUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export async function fetchUserProfile(): Promise<LocalUser | null> {
  try {
    const res = await request("/api/user/profile");
    if (!res.ok) return null;
    const json = (await res.json()) as { ok: boolean; user: LocalUser };
    return json.ok ? json.user : null;
  } catch {
    return null;
  }
}
