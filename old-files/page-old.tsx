export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="aspect-video h-30 w-full rounded-xl bg-green-500/50 md:w-full" />
        <div className="aspect-video h-30 w-full rounded-xl bg-amber-500/50 md:w-full" />
        <div className="aspect-video h-30 w-full rounded-xl bg-muted/50 md:w-full" />
        <div className="aspect-video h-30 w-full rounded-xl bg-muted/50 md:w-full" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  )
}
