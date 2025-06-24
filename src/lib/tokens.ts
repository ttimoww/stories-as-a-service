import jwt from 'jsonwebtoken';

interface ShareTokenPayload {
  storyId: number;
  iat: number;
  exp: number;
}

const DEFAULT_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const SECRET = process.env.AUTH_SECRET!;

export const shareToken = {
  create: ({ storyId, ttl }: { storyId: number; ttl?: number }) => {
    return jwt.sign({ storyId }, SECRET, {
      expiresIn: ttl ?? DEFAULT_TTL_SECONDS,
    });
  },

  read: (token: string): { storyId: number } | null => {
    try {
      const payload = jwt.verify(token, SECRET);

      if (typeof payload !== 'object' || !('storyId' in payload)) {
        return null;
      }

      return { storyId: (payload as ShareTokenPayload).storyId };
    } catch {
      return null;
    }
  },
};
