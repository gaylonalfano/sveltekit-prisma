import RSS from 'rss'
import * as posts from '$lib/services/posts'

export const GET = async ({ url }: RequestEvent) => {
	const allPosts = await posts.getPublishedPosts()
	const siteUrl = url.origin

	const feed = new RSS({
		title: `Title`,
		description: 'Description',
		site_url: `${siteUrl}`,
		feed_url: `${siteUrl}/rss.xml`,
	})

	allPosts.forEach((post) =>
		feed.item({
			title: post.title,
			description: post.description,
			url: `${siteUrl}/${post.slug}`,
			date: post.createdAt,
		})
	)

	return new Response(feed.xml({ indent: true }), {
  // NOTE You can speed up/optimize your site using cache headers
  // to cache data on the CDN (different from Edge!)
  // REF: https://youtu.be/uAF4Yd-gddo?t=1237
		headers: {
			'Content-Type': 'application/xml',
      'Cache-Control': `max-age=0, s-maxage=${60 * 60}`, // 1 hour
		},
	})
}
