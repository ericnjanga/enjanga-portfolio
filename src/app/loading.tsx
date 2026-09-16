/** The shared layout keeps navigation available while a route loads. */
export default function Loading() {
  return (
    <main aria-busy="true" className="route-loading">
      <p role="status">Loading page…</p>
    </main>
  );
}
