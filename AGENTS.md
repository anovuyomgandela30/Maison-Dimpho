<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- Enquiry-form submissions are stored server-side in `public.booking_requests` via `src/lib/booking.functions.ts` (service-role insert; RLS enabled with no anon policies, so anonymous visitors can never read or modify submissions). Never make the form client-state-only or show a success message before the submission is stored — leads must never be lost silently.
