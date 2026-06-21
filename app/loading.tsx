import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-skov-cream/70">
        <Loader2 className="h-5 w-5 animate-spin text-skov-gold" /> Loading SKOV GROUP…
      </div>
    </div>
  );
}
