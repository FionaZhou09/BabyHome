import { LogDetailScreen } from "@/components/screens/LogDetailScreen";

export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LogDetailScreen id={id} />;
}
