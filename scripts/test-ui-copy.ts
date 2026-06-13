import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const checks = [
  {
    file: "src/components/layout/bottom-tab-nav.tsx",
    forbidden: ['label: "Home"', 'label: "Log"', 'label: "AI Chat"', 'label: "History"', "months old"],
    required: ["首页", "记录", "陪伴", "历史", "个月"],
  },
  {
    file: "src/components/screens/ChatHeader.tsx",
    forbidden: ["Midnight Companion", "No judgment answers", "Online"],
    required: ["夜间陪伴", "不评判", "在线"],
  },
  {
    file: "src/components/screens/ChatInputBar.tsx",
    forbidden: ["Type or speak an anxious question..."],
    required: ["打字或说出你现在担心的问题"],
  },
  {
    file: "src/components/screens/HomeScreen.tsx",
    forbidden: ["AI Powered", "months old", "Tuned In", "Giant One-Hand Logs", "AI Reassurance", "Ask exactly how you feel"],
    required: ["AI 支持", "个月", "已同步", "单手快速记录", "安心提醒", "把现在的感受说出来"],
  },
  {
    file: "src/components/screens/HistoryScreen.tsx",
    forbidden: ["7-Day Log Sheet", "7-Day Activity Digest", "Long-form Daily Activity", "Past 7 Days"],
    required: ["7 天记录", "7 天照护摘要", "每日照护时间线", "最近 7 天"],
  },
  {
    file: "src/components/screens/LogScreen.tsx",
    forbidden: ["Log Live Activity", "Feeding Method", "Diaper Type", "Sleep Window", "Activity Notes", "Record Safe Log Entry"],
    required: ["记录照护", "喂养方式", "尿布类型", "睡眠时间段", "备注", "保存这条记录"],
  },
  {
    file: "src/components/screens/DailyReportCard.tsx",
    forbidden: ["Daily Summary", "Sleep", "Feeding", "Diapers", "Everything is on track today"],
    required: ["今日小结", "睡眠", "喂养", "尿布", "今天整体看起来很稳定"],
  },
  {
    file: "src/components/screens/MoodCheckin.tsx",
    forbidden: ["Exhausted", "Managing", "Good", "How are you feeling today?", "Thanks for checking in"],
    required: ["很累", "还能撑住", "还可以", "你今天感觉怎么样", "谢谢你告诉我"],
  },
  {
    file: "src/components/screens/WeeklyInsightsChart.tsx",
    forbidden: ["This Week at a Glance", "7 Days", '"Today"', "Sleep (hrs)", "Feedings", "finding your rhythm"],
    required: ["这周一眼看懂", "7 天", "今天", "睡眠", "喂养", "正在慢慢找到节奏"],
  },
  {
    file: "src/components/screens/OnboardingScreen.tsx",
    forbidden: ["Your warm companion", "What's your baby's name?", "Please enter a name", "When was", "Let's go", "Back"],
    required: ["给新手父母的温柔陪伴", "宝宝叫什么名字", "请输入宝宝名字", "什么时候出生", "开始使用", "返回"],
  },
  {
    file: "src/components/screens/ChatScreen.tsx",
    forbidden: ["Hi there, brave parent", "Remember: You are doing", "It is completely valid", "Drafting kindness", "Just now"],
    required: ["你好，辛苦的爸爸妈妈", "你已经做得很好了", "觉得累是完全正常的", "正在认真回复", "刚刚"],
  },
  {
    file: "src/components/screens/LogDetailScreen.tsx",
    forbidden: [" Entry", '"Today"', "Breast Side Source", "Timed Duration", "Diaper Type", "Sleep Location", "Total Output", "Detailed Notes", "Return Complete to Dashboard"],
    required: ["记录详情", "今天", "喂奶侧", "记录时长", "尿布类型", "睡眠位置", "总量", "详细备注", "回到首页"],
  },
];

for (const check of checks) {
  const content = readFileSync(join(root, check.file), "utf8");

  for (const phrase of check.forbidden) {
    assert.equal(
      content.includes(phrase),
      false,
      `${check.file} still contains English UI copy: "${phrase}"`
    );
  }

  for (const phrase of check.required) {
    assert.equal(
      content.includes(phrase),
      true,
      `${check.file} is missing Chinese UI copy: "${phrase}"`
    );
  }
}

console.log("ui copy tests passed");
