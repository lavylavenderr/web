import { useState } from "react";
import toast from "react-hot-toast";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div>
        <h2 className="font-semibold text-lg">Sent! 📫</h2>
        <p className="text-white/80">
          I'll respond as soon as possible, thanks again!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-1">
        <h2 className="font-semibold md:text-glow-white">
          Need to contact me? 📱
        </h2>
        <p className="text-white/75">
          Send me a message below with the ✨ tea ✨ and I'll get back to you!
        </p>
      </div>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const values = Object.fromEntries(
            new FormData(event.target as HTMLFormElement).entries()
          );

          setLoading(true);

          const response = await fetch("/api/contact", {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            method: "POST",
          });

          if (response.status === 400 || response.status === 500) {
            setLoading(false);
            return toast.error("An error has occured D:", { duration: 8000 });
          } else if (response.status === 403) {
            setLoading(false)
            return toast.error("Security check failed", { duration: 8000 })
          }

          setLoading(false);
          setSubmitted(true);

          return toast.success("Successfully sent your message!", {
            duration: 8000,
          });
        }}
        method="POST"
        action="/api/contact"
        className="space-y-2 [&>label]:block [&_input]:rounded-md [&_textarea]:rounded-md text-black"
      >
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="DMUClass158@gmail.com"
            className="w-full"
          />
        </label>

        <label htmlFor="body">
          <textarea
            id="body"
            name="body"
            rows={5}
            minLength={10}
            required
            placeholder="This is where you put your actual message, don't forget it! Also, did you know I like trains :O"
            className="w-full resize-y"
          />
        </label>

        {/* cloudflare turnstile stuff to prevent bots */}
        <div
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITEKEY}
        ></div>

        <button
          disabled={loading}
          type="submit"
          className="relative w-full overflow-hidden rounded-md bg-white p-2 text-black"
        >
          Send
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center bg-white text-black">
              <span className="h-4 w-4 animate-spin rounded-[50%] border-2 border-black/0 border-l-black border-t-black" />
            </span>
          )}
        </button>
      </form>
    </>
  );
}
