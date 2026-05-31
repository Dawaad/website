import type { FC } from 'react';

type Tok = [text: string, cls?: string];

const C = {
  kw: 'text-magenta',
  fn: 'text-cyan',
  str: 'text-amber',
  com: 'text-fg-3',
  num: 'text-amber-dim',
  base: 'text-fg-1',
};

const CODE: [num: string, toks: Tok[]][] = [
  ['30', [['/* pwd - print the full filename of the current working dir.  */', C.com]]],
  ['31', [['', C.base]]],
  ['32', [['#include ', C.kw], ['<config.h>', C.str]]],
  ['33', [['#include ', C.kw], ['<stdio.h>', C.str]]],
  ['34', [['#include ', C.kw], ['<getopt.h>', C.str]]],
  ['35', [['#include ', C.kw], ['<sys/types.h>', C.str]]],
  ['36', [['', C.base]]],
  ['37', [['#include ', C.kw], ['"system.h"', C.str]]],
  ['38', [['#include ', C.kw], ['"die.h"', C.str]]],
  ['39', [['#include ', C.kw], ['"error.h"', C.str]]],
  ['40', [['#include ', C.kw], ['"quote.h"', C.str]]],
  ['41', [['#include ', C.kw], ['"root-dev-ino.h"', C.str]]],
  ['42', [['#include ', C.kw], ['"xgetcwd.h"', C.str]]],
  ['43', [['', C.base]]],
  ['44', [['/* The official name of this program.  */', C.com]]],
  ['45', [['#define ', C.kw], ['PROGRAM_NAME ', C.base], ['"pwd"', C.str]]],
  ['46', [['', C.base]]],
  ['47', [['#define ', C.kw], ['AUTHORS ', C.base], ['proper_name', C.fn], [' (', C.base], ['"Jim Meyering"', C.str], [')', C.base]]],
  ['48', [['', C.base]]],
  ['49', [['struct ', C.kw], ['file_name', C.fn], [' {', C.base]]],
  ['50', [['  char ', C.base], ['*buf;', C.base]]],
  ['51', [['  size_t ', C.base], ['n_alloc;', C.base]]],
  ['52', [['  char ', C.base], ['*start;', C.base]]],
  ['53', [['};', C.base]]],
  ['54', [['', C.base]]],
  ['55', [['static struct ', C.kw], ['file_name *', C.base]]],
  ['56', [['file_name_init', C.fn], [' (', C.base], ['void', C.kw], [')', C.base]]],
  ['57', [['{', C.base]]],
  ['58', [['  struct ', C.kw], ['file_name *p = ', C.base], ['xmalloc', C.fn], [' (', C.base], ['sizeof ', C.kw], ['*p);', C.base]]],
  ['59', [['  p->n_alloc = ', C.base], ['1', C.num], [' + PATH_MAX;', C.base]]],
  ['60', [['  p->buf = ', C.base], ['xmalloc', C.fn], [' (p->n_alloc);', C.base]]],
  ['61', [['  p->start = p->buf + (p->n_alloc - ', C.base], ['1', C.num], [');', C.base]]],
  ['62', [['  p->start[', C.base], ['0', C.num], ['] = ', C.base], ["'\\0'", C.str], [';', C.base]]],
  ['63', [['  return ', C.kw], ['p;', C.base]]],
  ['64', [['}', C.base]]],
  ['65', [['', C.base]]],
  ['66', [['static int ', C.kw], ['logical_getcwd', C.fn], [' (void);', C.base]]],
  ['67', [['', C.base]]],
  ['68', [['int ', C.kw], ['pwd_main', C.fn], ['(int argc, char **argv) ', C.base], ['MAIN_EXTERNALLY_VISIBLE;', C.com]]],
  ['69', [['int ', C.kw], ['pwd_main', C.fn], ['(int argc, char **argv ', C.base], ['UNUSED_PARAM', C.com], [')', C.base]]],
  ['70', [['{', C.base]]],
  ['71', [['  char ', C.base], ['*buf;', C.base]]],
  ['72', [['', C.base]]],
  ['73', [['  if ', C.kw], ['(ENABLE_DESKTOP) {', C.base]]],
  ['74', [['    /* TODO: assume -L if $POSIXLY_CORRECT? */', C.com]]],
  ['75', [['     * Rationale:', C.com]]],
  ['76', [['     * POSIX wants -L, scripts expect -P', C.com]]],
  ['77', [['     */', C.com]]],
  ['78', [['    unsigned opt = ', C.base], ['getopt32', C.fn], ['(argv, ', C.base], ['"LP"', C.str], [');', C.base]]],
  ['79', [['    if ', C.kw], ['((opt & ', C.base], ['1', C.num], [') && ', C.base], ['logical_getcwd', C.fn], ['())', C.base]]],
  ['80', [['      return ', C.kw], ['fflush_all', C.fn], ['();', C.base]]],
  ['81', [['  }', C.base]]],
  ['82', [['', C.base]]],
  ['83', [['  buf = ', C.base], ['xrealloc_getcwd_or_warn', C.fn], ['(NULL);', C.base]]],
  ['84', [['', C.base]]],
  ['85', [['  if ', C.kw], ['(buf) {', C.base]]],
  ['86', [['    ', C.base], ['puts', C.fn], ['(buf);', C.base]]],
  ['87', [['    ', C.base], ['free', C.fn], ['(buf);', C.base]]],
  ['88', [['    return ', C.kw], ['fflush_all', C.fn], ['();', C.base]]],
  ['89', [['  }', C.base]]],
  ['90', [['  return ', C.kw], ['EXIT_FAILURE;', C.base]]],
  ['91', [['}', C.base]]],
];

/** Faux nvim buffer showing syntax-highlighted coreutils source. */
export const VimPanel: FC = () => {
  return (
    <div className="flex h-full flex-col font-mono text-[9.5px] leading-[1.45]">
      <pre className="m-0 flex-1">
        {CODE.map(([ln, toks], i) => (
          <div key={i} className="flex gap-2 whitespace-pre">
            <span className="w-5 flex-none text-right text-fg-4">{ln}</span>
            <span>
              {toks.map(([t, cls], j) => (
                <span key={j} className={cls ?? C.base}>
                  {t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>
      <div className="mt-1 flex justify-between bg-bg-3 px-2 py-0.5 text-[9px]">
        <span className="font-medium text-amber">NOR</span>
        <span className="text-fg-2">coreutils/pwd.c</span>
        <span className="text-fg-2">1 sel</span>
        <span className="text-fg-2">84:38</span>
      </div>
    </div>
  );
};
