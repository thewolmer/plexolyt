export default function NotFound() {
  return (
    <div className="grid h-screen place-content-center  px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-muted-foreground/50">400</h1>
        <p className="text-2xl font-bold tracking-tight  sm:text-4xl">Uh-oh!</p>
        <p className="mb-2 mt-4 text-muted-foreground">Could not find requested resource.</p>
      </div>
    </div>
  );
}
