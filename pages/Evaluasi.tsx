
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const Evaluasi: React.FC = () => {
  const [quizState, setQuizState] = useState<'start' | 'playing' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setQuizState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = () => {
    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizState('result');
    }
  };

  const resetQuiz = () => {
    setQuizState('start');
  };

  // Layar Mulai
  if (quizState === 'start') {
    return (
      <div className="max-w-2xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white/70 backdrop-blur-xl p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-white text-center space-y-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto shadow-xl shadow-indigo-200 rotate-3 animate-bounce">
            📝
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">Siap Uji Nyalimu?</h1>
            <p className="text-slate-500 font-medium leading-relaxed">
              Evaluasi ini berisi 20 soal mengenai Modifikasi Makanan Khas Daerah untuk mengukur sejauh mana pemahamanmu secara menyeluruh.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Durasi</span>
              <span className="text-sm font-bold text-slate-700">Santai / Mandiri</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Jumlah Soal</span>
              <span className="text-sm font-bold text-slate-700">{QUIZ_QUESTIONS.length} Butir</span>
            </div>
          </div>
          <button 
            onClick={handleStartQuiz}
            className="w-full py-5 bg-indigo-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-[0.98] transition-all"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    );
  }

  // Layar Hasil
  if (quizState === 'result') {
    const finalScore = (score / QUIZ_QUESTIONS.length) * 100;
    
    let feedback = {
      title: "Tetap Semangat!",
      message: "Jangan menyerah. Baca lagi materi di modul dan coba lagi ya!",
      icon: "🌱",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      circleColor: "#F59E0B"
    };

    if (finalScore >= 90) {
      feedback = {
        title: "Entrepreneur Sejati!",
        message: "Luar biasa! Kamu sudah sangat siap untuk membangun bisnis kuliner masa depan.",
        icon: "🏆",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        circleColor: "#10B981"
      };
    } else if (finalScore >= 75) {
      feedback = {
        title: "Inovator Hebat!",
        message: "Pemahamanmu sudah sangat baik. Terus asah kreativitasmu!",
        icon: "🚀",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        circleColor: "#4F46E5"
      };
    } else if (finalScore >= 60) {
      feedback = {
        title: "Cukup Kompeten",
        message: "Bagus! Kamu mengerti dasar-dasarnya. Tingkatkan lagi belajarmu.",
        icon: "✨",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        circleColor: "#3B82F6"
      };
    }

    return (
      <div className="max-w-2xl mx-auto py-10 animate-in zoom-in-95 duration-500 relative">
        {/* Celebration Background for High Scores */}
        {finalScore >= 80 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             {[...Array(20)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute animate-bounce opacity-20 text-2xl"
                 style={{ 
                   left: `${Math.random() * 100}%`, 
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 2}s`
                 }}
               >
                 🎉
               </div>
             ))}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-white text-center space-y-10 relative z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-indigo-600 to-amber-400"></div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hasil Evaluasi Belajar</h2>
          
          <div className="relative inline-block">
            <svg className="w-56 h-56 transform -rotate-90">
              <circle cx="112" cy="112" r="95" fill="none" stroke="#F1F5F9" strokeWidth="18" />
              <circle 
                cx="112" cy="112" r="95" fill="none" 
                stroke={feedback.circleColor} 
                strokeWidth="18" 
                strokeDasharray="597"
                strokeDashoffset={597 - (597 * finalScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black text-slate-900 leading-none">{Math.round(finalScore)}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">Poin Skor</span>
            </div>
          </div>
          
          <div className={`p-8 rounded-[2rem] ${feedback.bgColor} border border-white space-y-3`}>
            <div className="text-4xl">{feedback.icon}</div>
            <p className={`text-2xl font-black ${feedback.color}`}>{feedback.title}</p>
            <p className="text-slate-600 font-medium leading-relaxed italic text-sm">
              "{feedback.message}"
            </p>
          </div>

          <div className="bg-slate-50/50 p-6 rounded-2xl grid grid-cols-2 gap-4 border border-slate-100">
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Benar</span>
              <span className="text-2xl font-black text-emerald-600">{score}</span>
            </div>
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Salah</span>
              <span className="text-2xl font-black text-red-500">{QUIZ_QUESTIONS.length - score}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleStartQuiz}
              className="flex-1 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Ulangi Kuis
            </button>
            <button 
              onClick={resetQuiz}
              className="flex-1 py-5 bg-white text-slate-600 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
            >
              Kembali Ke Awal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Layar Bermain
  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Evaluasi Belajar</h1>
          <p className="text-slate-500 font-bold text-lg mt-2">Uji Pemahaman Materi PKWU XII</p>
        </div>
        <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-md px-6 py-4 rounded-3xl shadow-sm border border-white">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Pengerjaan</span>
            <div className="flex items-center space-x-3">
               <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-700 ease-out"
                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
               </div>
               <span className="font-black text-indigo-600 text-sm">{currentQuestion + 1}/{QUIZ_QUESTIONS.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl shadow-indigo-100/30 border border-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
           <div 
             className="h-full bg-indigo-600 transition-all duration-700"
             style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
           ></div>
        </div>
        
        <div className="p-10 md:p-16 space-y-12">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] bg-indigo-50 px-5 py-2 rounded-full border border-indigo-100">Pertanyaan ke-{currentQuestion + 1}</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-[1.3]">
              {question.question}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`group w-full text-left p-6 rounded-3xl border-2 transition-all flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-500`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center space-x-6">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${
                     selectedAnswer === index 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' 
                        : 'bg-white text-slate-400 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`text-lg font-bold transition-colors ${selectedAnswer === index ? 'text-indigo-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                    {option}
                  </span>
                </div>
                <div className={`w-6 h-6 rounded-full border-4 transition-all ${
                  selectedAnswer === index ? 'border-indigo-600 bg-white scale-110' : 'border-slate-100 bg-slate-50 opacity-0 group-hover:opacity-100'
                }`}></div>
              </button>
            ))}
          </div>

          <div className="pt-8 flex justify-end">
            <button
              disabled={selectedAnswer === null}
              onClick={handleAnswer}
              className={`group flex items-center px-12 py-5 font-black text-xl rounded-2xl transition-all shadow-xl ${
                selectedAnswer === null
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95'
              }`}
            >
              <span>{currentQuestion + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Lanjut Soal Berikutnya'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
        Dilarang bekerja sama saat pengerjaan evaluasi mandiri
      </div>
    </div>
  );
};

export default Evaluasi;
