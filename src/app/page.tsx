import { cookies } from "next/headers";
import { EmptyMemories } from "../components/EmptyMemories";
import { api } from "../lib/axios";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

dayjs.locale(ptBR);

interface MemoryProps {
  id: string;
  cover_url: string;
  is_public: boolean;
  created_at: string;
  excerpt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("nlw-spacetime-token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get("nlw-spacetime-token")?.value;
  const { data } = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data.memories.length === 0) {
    return <EmptyMemories />;
  }

  const memories = data.memories as MemoryProps[];
  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return (
          <div className="space-y-4" key={memory.id}>
            <time
              className="-ml-8 flex items-center gap-2 text-sm 
            text-gray-100 before:h-px before:w-5 before:bg-gray-50"
            >
              {dayjs(memory.created_at).format("D[ de ]MMMM[, ]YYYY")}
            </time>
            <Image
              src={memory.cover_url}
              width={592}
              height={280}
              alt="image/preview"
              className="aspect-video w-full rounded-lg object-cover"
            />

            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
