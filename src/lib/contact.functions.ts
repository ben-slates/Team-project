import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        name: z.string().min(1).max(200),
        email: z.string().email(),
        company: z.string().max(200).optional(),
        message: z.string().min(10).max(4000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads" as never).insert({
      email: data.email,
      company_name: data.company ?? null,
      domain: "(contact form)",
      grade: "-",
      score: 0,
      results: { name: data.name, message: data.message },
      source: "contact",
    } as never);

    if (error) {
      console.error("Failed to store contact lead", error);
      throw new Error("Something went wrong sending your message.");
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: "Rynex Contact",
            embeds: [
              {
                title: "New contact form submission",
                color: 0x00d494,
                fields: [
                  { name: "Name", value: data.name, inline: true },
                  { name: "Email", value: data.email, inline: true },
                  { name: "Company", value: data.company || "—", inline: true },
                  { name: "Message", value: data.message.slice(0, 1000) },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (e) {
        console.warn("Discord webhook failed", e);
      }
    }

    return { ok: true as const };
  });
