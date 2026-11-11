import { KW_2027_POSTS } from "./kw2027Posts";
import { BlogPost } from "./blogPosts";
import { DE_BLOG_POSTS_1 } from "./deBlogPosts1";

// German blog corpus. The former 200 Dutch sample posts have been removed; the
// blog now ships a focused set of German articles. Add further batches here.
export const ALL_POSTS: BlogPost[] = [...KW_2027_POSTS, ...DE_BLOG_POSTS_1].sort((a, b) =>
  b.dateISO.localeCompare(a.dateISO)
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}
