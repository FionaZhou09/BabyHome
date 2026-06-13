import { strict as assert } from "node:assert";
import {
  getSpeechRecognitionConstructor,
  isSpeechRecognitionSupported,
} from "../src/lib/speech/speech-recognition";
import {
  getTtsProfile,
  inferTtsEmotionState,
  selectWarmFemaleVoice,
} from "../src/lib/speech/tts";

class FakeRecognition {
  continuous = false;
  interimResults = false;
  lang = "";
  onresult = null;
  onend = null;
  onerror = null;
  start() {}
  stop() {}
}

assert.equal(isSpeechRecognitionSupported({ SpeechRecognition: FakeRecognition }), true);
assert.equal(isSpeechRecognitionSupported({ webkitSpeechRecognition: FakeRecognition }), true);
assert.equal(isSpeechRecognitionSupported({}), false);
assert.equal(getSpeechRecognitionConstructor({ SpeechRecognition: FakeRecognition }), FakeRecognition);

const gentleVoice = selectWarmFemaleVoice(
  [
    { name: "Alex", lang: "en-US" },
    { name: "Google 普通话 Female", lang: "zh-CN" },
    { name: "Microsoft Xiaoxiao Online", lang: "zh-CN" },
  ],
  "zh-CN"
);
assert.equal(gentleVoice?.name, "Microsoft Xiaoxiao Online");

assert.equal(inferTtsEmotionState("我真的崩溃了，撑不住了"), "collapsing");
assert.equal(inferTtsEmotionState("18个月怎么断奶？"), "steady");

const collapseProfile = getTtsProfile("collapsing");
assert.equal(collapseProfile.delayMs, 900);
assert.ok(collapseProfile.rate < 0.85);

const steadyProfile = getTtsProfile("steady");
assert.equal(steadyProfile.delayMs, 0);
assert.ok(steadyProfile.rate < 1);

console.log("speech helper tests passed");
