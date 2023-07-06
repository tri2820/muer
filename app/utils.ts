import { useMemo } from "react";
import { useMatches } from "@remix-run/react";
import type { User } from "./models/user.server";
import { XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";



export function useMatchesData(id: string) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

export function isUser(user: User) {
  return user && typeof user === "object";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function fromNow(date: Date | string, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const YEAR = 365 * DAY;
  const MONTH = YEAR / 12;
  const intervals = [
      { ge: YEAR, divisor: YEAR, unit: 'year' },
      { ge: MONTH, divisor: MONTH, unit: 'month' },
      { ge: WEEK, divisor: WEEK, unit: 'week' },
      { ge: DAY, divisor: DAY, unit: 'day' },
      { ge: HOUR, divisor: HOUR, unit: 'hour' },
      { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
      { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
      { ge: 0, divisor: 1, text: 'just now' },
  ];
  try {
    // @ts-ignore
    const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
    const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
        if (diffAbs >= interval.ge) {
            const x = Math.round(Math.abs(diff) / interval.divisor);
            const isFuture = diff < 0;
            // @ts-ignore
            return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
        }
    }
  } catch {
    return null
  }
  
}

function sleep(time: number) : Promise<'timed_out'> {
  return new Promise((resolve, reject) => {
    setTimeout(() => { return resolve('timed_out') }, time);
  });
}

export async function runWithTimeout<T>(f: () =>T, timeoutDuration: number) : Promise<'timed_out' | T> {
  const timeoutPromise = sleep(timeoutDuration);
  const myAsyncFunctionPromise = f();
  const result = await Promise.race([myAsyncFunctionPromise, timeoutPromise]);
  return result
}

export async function aTryCatch<Result>(f: () => Promise<Result>, catcher: (e: any) => Promise<Result>) {
  try {
    return await f();
  } catch (e) {
    return await catcher(e);
  }
}

export function awaitable(f: (...args: any[]) => any, id: any, ...args: any[]): Promise<any> {
  return new Promise(resolve => {
    f(...args, (err: any, response: any) => resolve({
      id,
      err,
      response
    }));
  });
}

export const build_summarize_prompt = (text: string) => {
  return `${text}\nSummarize the theme of the article in 8 words.
Keep 2 interesting insights and 3 data/numbers (dollars, statistics, date).
Response format:
{"theme":"...","insights":["..."],"data":["..."]}
Reply with only the JSON.`
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function isJsonString(str: string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export function capitalize(s: string) {
  return  s[0].toUpperCase() + s.substring(1); 
}

export const SERVERS = [
  'https://vid.priv.au',
  'https://iv.melmac.space',
  // 'https://inv.tux.pizza',
  // 'https://inv.in.projectsegfau.lt',
  'https://inv.makerlab.tech',
  'https://invidious.slipfox.xyz',
  'https://inv.pistasjis.net',
  'https://par1.iv.ggtyler.dev',
  'https://iv.melmac.space',
  // 'https://invidious.lunar.icu',
  'https://yt.oelrichsgarcia.de',
  // 'https://inv.zzls.xyz'
]

export const randomFetch = (input: string) => {
  const randomServer = SERVERS[Math.floor(Math.random() * SERVERS.length)];
  const inp = `${randomServer}/${input}`
  console.log('debug randomFetch', inp)
  return fetch(inp)
}