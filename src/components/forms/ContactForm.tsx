export function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Name</span>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            name="name"
            placeholder="Your name"
            type="text"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Email</span>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Phone</span>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            name="phone"
            placeholder="(555) 123-4567"
            type="tel"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-neutral-700">Address</span>
          <input
            className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
            name="address"
            placeholder="Project address"
            type="text"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-neutral-700">How can we help you?</span>
        <textarea
          className="min-h-36 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950"
          name="message"
          placeholder="Tell us about the home you want to build."
        />
      </label>

      <button
        className="inline-flex items-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        type="submit"
      >
        Send inquiry
      </button>
    </form>
  )
}
