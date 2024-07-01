import React from 'react';
import * as s from "../../pages/Typing/style";


interface TypingStatsBoxProps {
  label: string;
  value: string | number;
  color?: string;
}
const TypingStatsBox: React.FC<TypingStatsBoxProps> = ({ label, value, color }) => (
  <s.Typing_stats_box>
    <div>
      <p>{label}</p>
      <s.ColoredSpan color={color}>{value}</s.ColoredSpan>
    </div>
    <s.Typing_stats_bar>
      <s.Typing_stats_display></s.Typing_stats_display>
    </s.Typing_stats_bar>
  </s.Typing_stats_box>
);

export default TypingStatsBox;
