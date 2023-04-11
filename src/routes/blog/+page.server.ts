import * as posts from '$lib/services/posts'

export const load = async ({ setHeaders }) => {
  // NOTE You can speed up/optimize your site using cache headers
  // REF: https://youtu.be/uAF4Yd-gddo?t=1237
  setHeaders({
    'Cache-Control': `max-age=0, s-maxage=${60 * 10}` // 10 min
  });

	return { posts: await posts.getPublishedPosts() }
}
