import { User, GameRequest } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Giriş başarısız');
      }
      return res.json();
    },
    register: async (username: string, email: string, password: string): Promise<User> => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Kayıt başarısız');
      }
      return res.json();
    }
  },
  games: {
    list: async (): Promise<GameRequest[]> => {
      const res = await fetch(`${API_URL}/games`);
      return res.json();
    },
    create: async (game: Partial<GameRequest>): Promise<GameRequest> => {
      const res = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game),
      });
      return res.json();
    },
    join: async (id: number): Promise<void> => {
      await fetch(`${API_URL}/games/${id}/join`, { method: 'POST' });
    }
  },
  users: {
    update: async (user: User): Promise<User> => {
      const res = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return res.json();
    }
  }
};