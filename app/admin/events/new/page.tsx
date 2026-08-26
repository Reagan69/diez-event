import EventForm from "@/components/admin/EventForm";
import { getCategories } from "@/lib/events";

export default async function NewEventPage() {
  const categories = await getCategories();

  return <EventForm categories={categories} />;
}