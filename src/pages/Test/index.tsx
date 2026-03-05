import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useUserStore } from "@/shared/store/useUserStore";

const TEST_DATA = {
  id: 1,
  name: "Стандарты обслуживания",
  passing_score: 80,
  questions: [
    {
      id: 101,
      text: "Как правильно приветствовать покупателя в Зоозавр?",
      options: [
        { id: "a", text: "Просто кивнуть" },
        {
          id: "b",
          text: "Улыбнуться и сказать: 'Добрый день! Чем могу помочь?'",
        },
        { id: "c", text: "Ждать, пока он сам заговорит" },
      ],
      correct_option: "b",
      points: 50,
    },
    {
      id: 102,
      text: "Можно ли заходить в торговый зал без бейджа?",
      options: [
        { id: "a", text: "Да, если все меня знают" },
        { id: "b", text: "Только во время приемки товара" },
        { id: "c", text: "Нет, бейдж обязателен" },
      ],
      correct_option: "c",
      points: 50,
    },
  ],
};

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Подключаем функции сохранения из Store
  const { addXP, completeCourse } = useUserStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = TEST_DATA.questions[currentStep];

  const handleNext = () => {
    let finalScore = score;
    if (selectedOption === currentQuestion.correct_option) {
      finalScore += currentQuestion.points;
      setScore(finalScore);
    }

    if (currentStep < TEST_DATA.questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Сохраняем прогресс, если тест завершен
      if (finalScore >= TEST_DATA.passing_score) {
        addXP(finalScore);
        completeCourse(Number(id) || TEST_DATA.id);
      }
      setIsFinished(true);
    }
  };

  if (isFinished) {
    const isPassed = score >= TEST_DATA.passing_score;
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full text-center space-y-6">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center ${isPassed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
          {isPassed ? <Trophy size={48} /> : <XCircle size={48} />}
        </div>
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            {isPassed ? "Тест пройден!" : "Не повезло..."}
          </h2>
          <p className="text-slate-500 mt-2 italic font-medium">
            Ваш результат:{" "}
            <span className="font-black text-slate-900">{score}</span> из 100
            баллов
          </p>
        </div>
        <div className="w-full p-4 bg-slate-50 rounded-3xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Минимальный балл для зачета: {TEST_DATA.passing_score}
        </div>
        <Button
          onClick={() => navigate("/courses")}
          className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black shadow-xl shadow-slate-200 active:scale-95 transition-all">
          ВЕРНУТЬСЯ К КУРСАМ
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Вопрос {currentStep + 1} из {TEST_DATA.questions.length}
        </span>
        <div className="w-8" />
      </div>

      <div className="h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{
            width: `${((currentStep + 1) / TEST_DATA.questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xl font-black text-slate-900 mb-8 leading-tight italic uppercase tracking-tighter">
          {currentQuestion.text}
        </h2>

        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-5 text-left rounded-3xl border-2 transition-all flex items-center justify-between group ${
                selectedOption === option.id
                  ? "border-slate-900 bg-slate-900 text-white shadow-xl"
                  : "border-slate-100 bg-white hover:border-slate-300"
              }`}>
              <span
                className={`font-bold text-sm ${selectedOption === option.id ? "text-white" : "text-slate-700"}`}>
                {option.text}
              </span>
              {selectedOption === option.id && (
                <CheckCircle2 className="text-green-400" size={20} />
              )}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <Button
            disabled={!selectedOption}
            onClick={handleNext}
            className={`w-full h-16 rounded-[24px] font-black text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
              selectedOption
                ? "bg-green-600 text-white shadow-green-100"
                : "bg-slate-200 text-slate-400 shadow-none"
            }`}>
            {currentStep === TEST_DATA.questions.length - 1
              ? "ЗАВЕРШИТЬ"
              : "ДАЛЕЕ"}
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
