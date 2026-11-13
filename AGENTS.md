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

## Portfolio architecture
- Preserve the uploaded portfolio markup and original interaction logic in browser-initialized modules; this avoids rewriting or losing original content.
- Store original media through asset pointers and resolve their URLs through a shared media map, keeping binary payloads out of source.
- Define all portfolio presentation in the global semantic token-based design system, keeping visual values out of content markup.
- Initialize decorative banner media alongside the preserved runtime and pause it outside the visible banner, in hidden tabs, or during modal playback; this preserves content and avoids competing video playback.
