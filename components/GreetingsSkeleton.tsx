import Card from "./Card";

export default function GreetingsSkeleton() {
  return (
    <Card className="w-full py-14">
      <div className="animate-pulse flex space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-300 rounded" />
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 col-span-2 rounded bg-gray-300" />
            <div className="h-2 col-span-1 rounded bg-gray-300" />
          </div>
          <div className="h-2 rounded bg-gray-300" />
        </div>
      </div>
    </Card>
  );
}
