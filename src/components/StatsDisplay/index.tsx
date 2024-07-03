import React from 'react';
import * as s from "../../pages/Typing/style";



interface TypingStatsBoxProps {
  label: string;
  value: string | number;
  color?: string;
  barWidth?: string;
}

const TypingStatsBox = ({ label, value, color, barWidth } : TypingStatsBoxProps) => (
  <s.Typing_stats_box>
    <div>
      <p>{label}</p>
      <s.ColoredSpan color={color}>{value}</s.ColoredSpan>
    </div>
    <s.Typing_stats_bar>
      <s.Typing_stats_display width={barWidth}></s.Typing_stats_display>
    </s.Typing_stats_bar>
  </s.Typing_stats_box>
);

export default TypingStatsBox;
