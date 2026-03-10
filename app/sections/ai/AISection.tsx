import Text from "@/app/components/Text";
import { LocaleDictionary } from "@/app/lib/i18n/types";
import React from "react";

interface AISectionProps {
  t: LocaleDictionary;
}

const AISection: React.FC<AISectionProps> = ({ t }) => {
  return (
    <section className="ai-section v-box" id="ai-360°">
      <Text fontSize="2xl" htmlElement="h3" fontVariant="lineca">
        {t.aiSection.title}
      </Text>
      <Text fontSize="lg">{t.aiSection.paragraph}</Text>
    </section>
  );
};

export default AISection;
