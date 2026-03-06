import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCourseStore } from "@/shared/store/useCourseStore";
import type { IQuestion } from "@/shared/types";

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currentTest, fetchTestDetail, submitTest, isLoading } =
    useCourseStore();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchTestDetail(id);
    }
  }, [id, fetchTestDetail]);

  if (isLoading && !currentTest) {
    return (
      <div className="p-10 text-center font-black animate-pulse text-slate-900 uppercase tracking-tighter">
        ЗАГРУЗКА ТЕСТА...
      </div>
    );
  }

  if (!currentTest) return null;

  const currentQuestion: IQuestion = currentTest.questions[currentStep];

  const handleNext = async () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      selected: selectedOption,
      isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentStep < currentTest.questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;
      const finalScore = Math.round(
        (correctCount / currentTest.questions.length) * 100,
      );

      try {
        const res = await submitTest(Number(id), {
          score: finalScore,
          answers: updatedAnswers,
        });
        setResultData(res);
        setIsFinished(true);
      } catch (e) {
        console.error("Ошибка при отправке теста:", e);
      }
    }
  };

  if (isFinished) {
    const score = resultData?.result?.score ?? 0;
    const isPassed = score >= currentTest.passingScore;

    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-full text-center space-y-6 bg-white">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-700 scale-110 ${
            isPassed
              ? "bg-green-100 text-green-600 shadow-green-100"
              : "bg-red-100 text-red-600 shadow-red-100"
          }`}>
          {isPassed ? <Trophy size={48} /> : <XCircle size={48} />}
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
            {isPassed ? "Тест пройден!" : "Попробуй еще раз"}
          </h2>
          <p className="text-slate-500 font-bold italic">
            Ваш результат:{" "}
            <span
              className={`font-black ${isPassed ? "text-green-600" : "text-red-600"}`}>
              {score}%
            </span>
          </p>
        </div>

        <div className="w-full p-4 bg-slate-50 rounded-3xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Минимальный порог: {currentTest.passingScore}%
        </div>

        <Button
          onClick={() => navigate("/courses")}
          className="w-full h-16 rounded-[24px] bg-slate-900 text-white font-black shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
          ВЕРНУТЬСЯ В БИБЛИОТЕКУ
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft className="text-slate-900" />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Вопрос {currentStep + 1} из {currentTest.questions.length}
        </span>
        <div className="w-10" />
      </div>

      <div className="h-1.5 w-full bg-slate-100">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep + 1) / currentTest.questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-black text-slate-900 mb-8 leading-tight italic uppercase tracking-tighter">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option: string) => (
            <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`w-full p-5 text-left rounded-3xl border-2 transition-all flex items-center justify-between group ${
                selectedOption === option
                  ? "border-slate-900 bg-slate-900 text-white shadow-xl translate-x-1"
                  : "border-slate-100 bg-white hover:border-slate-200 text-slate-700"
              }`}>
              <span className="font-bold text-sm tracking-tight">{option}</span>
              {selectedOption === option && (
                <CheckCircle2 className="text-green-400 shrink-0" size={20} />
              )}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <Button
            disabled={!selectedOption || isLoading}
            onClick={handleNext}
            className={`w-full h-16 rounded-[24px] font-black text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
              selectedOption
                ? "bg-green-600 text-white shadow-green-100"
                : "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
            }`}>
            {isLoading ? (
              "ОБРАБОТКА..."
            ) : (
              <>
                {currentStep === currentTest.questions.length - 1
                  ? "ЗАВЕРШИТЬ"
                  : "ДАЛЕЕ"}
                <ArrowRight size={20} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
