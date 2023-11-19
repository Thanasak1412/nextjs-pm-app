import Card from "@/components/Card";

export default function HomePageLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="px-0 rounded-full">
        <div className="w-16 h-16 animate-spin border-4 border-dashed rounded-full dark:border-violet-400" />
      </Card>
    </div>
  );
}
