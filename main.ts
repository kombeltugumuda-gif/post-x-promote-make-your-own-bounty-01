// Entry for make.fun's "Promote make.fun's make-your-own-bounty post on X" bounty.
//
// The entry itself is a single post on X, not this program. The post quotes
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), carries a photo of its
// own (assets/post-photo.png), and its text holds make.fun / @makefunai plus
// one of this account's play codes. POST.json at this repository's root names
// that post's address; the house reads the post's replies, reposts and quotes
// from X itself, so nothing this program writes about the post is scored.
//
// All this program does is copy POST.json from the repository into the output
// directory, where the gate reads it. It uses only the Node standard library,
// reads no network, no clock and no file outside the repository, and writes
// the same bytes on every run.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  // Read first so a missing or malformed POST.json fails loudly instead of
  // silently copying a placeholder the gate would refuse.
  const parsed = JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8'));
  if (typeof parsed?.url !== 'string') throw new Error('POST.json has no url string');
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`Could not copy POST.json from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
