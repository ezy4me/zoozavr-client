import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/shared/ui/button";
import { useCourseStore } from "@/shared/store/useCourseStore";

export default function MaterialPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentCourse, completeMaterial, fetchMaterialContent } =
    useCourseStore();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const material = currentCourse?.materials.find(
    (m) => Number(m.id) === Number(id),
  );

  useEffect(() => {
    async function loadContent() {
      if (material?.contentPath) {
        setLoading(true);
        const text = await fetchMaterialContent(material.contentPath);
        setContent(text);
        setLoading(false);
      }
    }
    loadContent();
  }, [id, material?.contentPath]);

  const handleComplete = async () => {
    if (id && material && !material.isCompleted) {
      // Кнопка станет disabled сразу после вызова за счет обновления стейта в сторе
      await completeMaterial(Number(id));
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-black animate-pulse uppercase">
        Загрузка...
      </div>
    );
  if (!material)
    return <div className="p-10 text-center font-bold">Урок не найден</div>;

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center gap-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-50 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-black truncate text-lg uppercase italic">
          {material.name}
        </h1>
      </div>

      <div className="p-6 flex-1 prose prose-slate max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="p-6 border-t sticky bottom-0 bg-white/90 backdrop-blur-sm">
        <Button
          onClick={handleComplete}
          disabled={material.isCompleted}
          className={`w-full h-16 rounded-[24px] font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
            material.isCompleted
              ? "bg-green-100 text-green-600 shadow-none cursor-default"
              : "bg-slate-900 text-white active:scale-95"
          }`}>
          {material.isCompleted ? (
            <>
              <CheckCircle size={24} /> ИЗУЧЕНО
            </>
          ) : (
            "Я ПРОЧИТАЛ(А)"
          )}
        </Button>
      </div>
    </div>
  );
}
