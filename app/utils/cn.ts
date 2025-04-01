import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* 
This piece of code is taken from the shadcn/ui library.
its used to merge tailwind classes.
the reason i took it from the library its because it deals with the edge cases that tailwind has.
But i'm not using the library itself so shadcn might not be happy about this.
will remove if i can find a better solution so for now it's treated as a placeholder.

gotta just pray that shadcn doesn't get mad at me for this.
meow
*/

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
