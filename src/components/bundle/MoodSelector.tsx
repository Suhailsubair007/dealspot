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
    <div className="grid grid-cols-2 gap-4">
      {MOOD_CONFIGS.map((mood) => {
        const isSelected = selectedMood === mood.id;
        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => onSelectMood(mood.id)}
            className={`relative rounded-3xl p-6 transition-all duration-300 overflow-hidden group ${
              isSelected ? "scale-[1.02]" : "hover:scale-[1.01] active:scale-[0.98]"
            }`}
            style={{
              background: isSelected
                ? "linear-gradient(135deg, rgba(111, 78, 55, 0.15) 0%, rgba(166, 123, 91, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: isSelected
                ? "0 8px 32px rgba(111, 78, 55, 0.2), 0 2px 8px rgba(111, 78, 55, 0.1)"
                : "0 8px 32px rgba(166, 123, 91, 0.1), 0 2px 8px rgba(166, 123, 91, 0.05)",
              border: isSelected ? "2px solid rgba(111, 78, 55, 0.3)" : "2px solid transparent",
            }}
          >
            {/* Animated gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#6F4E37]/10 via-[#A67B5B]/5 to-[#ECB176]/5 rounded-3xl transition-opacity duration-500 ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />

            {/* Decorative gradient orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6F4E37]/10 via-[#A67B5B]/5 to-transparent rounded-full blur-2xl -z-0" />

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300"
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(111, 78, 55, 0.2) 0%, rgba(166, 123, 91, 0.15) 100%)"
                    : "linear-gradient(135deg, rgba(111, 78, 55, 0.1) 0%, rgba(166, 123, 91, 0.05) 100%)",
                  boxShadow: isSelected
                    ? "0 4px 16px rgba(111, 78, 55, 0.2)"
                    : "0 2px 8px rgba(111, 78, 55, 0.1)",
                }}
              >
                {mood.icon}
              </div>
              <div className="text-center">
                <h3
                  className={`text-base font-black tracking-tight mb-1 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] bg-clip-text text-transparent"
                      : "text-[#6F4E37]/80"
                  }`}
                >
                  {mood.title}
                </h3>
                <p className="text-xs text-[#6F4E37]/60 font-semibold line-clamp-2">
                  {mood.description}
                </p>
              </div>
            </div>

            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r from-[#6F4E37] to-[#A67B5B] shadow-lg shadow-[#6F4E37]/50 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}

