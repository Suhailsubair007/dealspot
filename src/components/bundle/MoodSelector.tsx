import type { MoodType } from "../../types/bundles";
import { MOOD_CONFIGS } from "../../constants";

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
}

export default function MoodSelector({
  selectedMood,
  onSelectMood,
}: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {MOOD_CONFIGS.map((mood) => {
        const isSelected = selectedMood === mood.id;
        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => onSelectMood(mood.id)}
            className={`relative rounded-2xl p-5 transition-all duration-300 overflow-hidden group ${
              isSelected ? "scale-[1.01]" : "hover:scale-[1.005] active:scale-[0.99]"
            }`}
            style={{
              background: isSelected
                ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: isSelected
                ? "0 8px 24px rgba(111, 78, 55, 0.2), 0 2px 8px rgba(111, 78, 55, 0.1), inset 0 0 0 2px rgba(111, 78, 55, 0.15)"
                : "0 4px 16px rgba(166, 123, 91, 0.1), 0 1px 4px rgba(166, 123, 91, 0.05)",
              border: "1px solid rgba(166, 123, 91, 0.15)",
            }}
          >
            {/* Animated gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#6F4E37]/8 via-[#A67B5B]/4 to-[#ECB176]/4 rounded-2xl transition-opacity duration-500 ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />

            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#ECB176]/15 to-transparent rounded-full blur-xl -z-0" />

            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* Icon with enhanced styling */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2.5xl transition-all duration-300 relative"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(111, 78, 55, 0.12) 0%, rgba(166, 123, 91, 0.1) 100%)"
                    : "linear-gradient(135deg, rgba(111, 78, 55, 0.08) 0%, rgba(166, 123, 91, 0.06) 100%)",
                  boxShadow: isSelected
                    ? "0 4px 12px rgba(111, 78, 55, 0.15), inset 0 1px 2px rgba(255,255,255,0.5)"
                    : "0 2px 8px rgba(111, 78, 55, 0.1), inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
              >
                {mood.icon}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] border-2 border-white shadow-sm" />
                )}
              </div>
              
              {/* Text Content */}
              <div className="text-center w-full">
                <h3
                  className={`text-sm font-bold tracking-tight mb-1 leading-tight ${
                    isSelected
                      ? "bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent"
                      : "text-[#6F4E37]"
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {mood.title}
                </h3>
                <p className="text-[10px] text-[#6F4E37]/65 font-medium line-clamp-2 leading-tight px-1">
                  {mood.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

