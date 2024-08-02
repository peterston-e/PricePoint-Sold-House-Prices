// Without a defined matcher, this one line applies next-auth to the entire project.
export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes. Can also be
// a regex or an array of strings or regexes.
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

// ****** Uncomment line below to setup up auth on specific pages ******
// export const config = { matcher: ["/doesntexist", "/subscribers"] };
