'use client';

import { signOut } from 'next-auth/react';

export function Logout() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
