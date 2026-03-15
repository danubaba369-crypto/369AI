import { z } from 'zod';
import { insertProjectSchema, projects } from './schema';

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/projects/:id",
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/projects",
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
      },
    },
    update: {
      method: "PATCH" as const,
      path: "/api/projects/:id",
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/projects/:id",
      responses: {
        204: z.null(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  admin: {
    login: {
      method: "POST" as const,
      path: "/api/admin/login",
      responses: {
        200: z.object({ success: z.boolean() }),
        401: z.object({ message: z.string() }),
      },
    },
  },
};

// Required helper for frontend
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
