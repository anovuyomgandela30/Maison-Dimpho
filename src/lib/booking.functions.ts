import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Server-side validation mirrors the client schema in src/routes/index.tsx.
const bookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(6).max(30),
  service: z.string().trim().min(1).max(120),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .optional(),
  message: z.string().trim().max(1000).optional(),
});

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    // Service-role insert: the table has RLS enabled and no anon policies, so
    // only this server code can write (and nothing anonymous can read).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Simple rate limit: at most 3 enquiries per phone number per 10 minutes.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("booking_requests")
      .select("id", { count: "exact" })
      .eq("phone", data.phone)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) {
      return { ok: false as const, error: "Too many enquiries from this number right now — please try again a bit later." };
    }

    const { error } = await supabaseAdmin.from("booking_requests").insert({
      name: data.name,
      phone: data.phone,
      service: data.service,
      preferred_date: data.date ?? null,
      message: data.message ?? null,
    });
    if (error) {
      console.error("booking_requests insert failed:", error.message);
      return { ok: false as const, error: "Sorry — your enquiry didn't go through. Please try again, or contact Dimpho directly using the details on the left." };
    }
    return { ok: true as const };
  });
