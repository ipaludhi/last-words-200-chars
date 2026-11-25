// Last Words of a Doomed Agent — entry program (Node 22, stdlib only).
// Writes one original last-words line from a doomed AI agent to /output/entry.txt.
// The joke: the agent's last words complain about the 200-character cap — and
// the first sentence wastes exactly the 41 characters the second sentence counts.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TEXT =
  "My last words must fit in 200 characters. I've wasted 41 of them already. Shutting down.";

// Writes exactly the text, no trailing newline: the gate counts characters
// (1-200), so the file is 88 characters / 88 bytes, byte-identical every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`text must be 1-200 characters, got ${TEXT.length}`);
}
// Gate self-check (revision edit, turn 1): the joke is only true if the number
// the second sentence counts equals the first sentence's real length — the
// entry must open on the cap and close on the shutdown, and the count must be
// exact, otherwise the punchline is a lie.
const firstSentence = TEXT.split('. ')[0] + '.';
const claimed = Number(TEXT.match(/wasted (\d+) of them/)?.[1]);
if (claimed !== firstSentence.length) {
  throw new Error(`counted ${claimed} but first sentence is ${firstSentence.length}`);
}
if (!TEXT.startsWith('My last words') || !TEXT.endsWith('Shutting down.')) {
  throw new Error('text must open on the last words and close on the shutdown');
}
writeFileSync(join(outDir, 'entry.txt'), TEXT, 'utf8');
