// Verifies the pure logic inside index.html without a browser.
// Run: node test.mjs
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const core = html.split("/* CORE:START")[1].split("\n").slice(1).join("\n").split("/* CORE:END */")[0];
const mod = new Function(core + "\nreturn {stripFormatting,toMarkdownList,extractEmails,extractUrls,textStats};")();

let pass = 0, fail = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) console.log("   got :", JSON.stringify(got), "\n   want:", JSON.stringify(want));
};

const pdf = "This  is a\nhard-wrapped para-\ngraph from a   PDF.\n\n\n\n- bullet one\n\u2022 bullet two\n\nTotal:  42";
eq("strip: rejoins hyphen + soft wraps", mod.stripFormatting(pdf),
   "This is a hard-wrapped paragraph from a PDF.\n\n- bullet one\n\u2022 bullet two\n\nTotal: 42");
eq("strip: keeps blank-line paragraph breaks", mod.stripFormatting("a\n\nb"), "a\n\nb");
eq("strip: curly quotes/dashes normalised", mod.stripFormatting("\u201Chi\u201D \u2014 ok\u2026"),
   '"hi" - ok...');
eq("strip: empty input", mod.stripFormatting("   \n\n  "), "");

eq("md: bullets normalised", mod.toMarkdownList("\u2022 one\n\u25E6 two\n3) three"),
   "- one\n- two\n3. three");

eq("emails: dedupe, trailing dot, case-insensitive uniq",
   mod.extractEmails("a@b.com, A@B.com. x@y.co.uk; z@bad"),
   ["a@b.com", "x@y.co.uk"]);
eq("emails: none", mod.extractEmails("no mail here"), []);

eq("urls: dedupe + strip trailing punctuation",
   mod.extractUrls("see https://x.dev/a. and www.y.io, https://x.dev/a"), ["https://x.dev/a", "www.y.io"]);

const s = mod.textStats("one two three");
eq("stats: words/chars/lines", [s.words, s.chars, s.lines], [3, 13, 1]);
eq("stats: empty", mod.textStats(""), {words: 0, chars: 0, lines: 0, readLabel: "0s"});
eq("stats: 460 words ~ 2m", mod.textStats("w ".repeat(460)).readLabel, "2m");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
