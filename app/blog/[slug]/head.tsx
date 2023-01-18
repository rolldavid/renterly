import { PostList, PostProps } from "./components/types";

const getPost = async (slug: string) => {

    const res = await fetch(`${process.env.BLOG_URL}/api/posts?filters[slug][$contains]=${slug}`, {
        headers: {
            "Authorization": "bearer 384608448611cdecd418b519f2c36d9f36a9618a910bdc5230c93a294f3a0b37cb042fd89ab613624575e2e9d93e0a777a59b7da810006e69bca9c238aafd55a891ef42016b051495cbbe42f78bc12042a045e2c7cb5c182734422300cc0827a0a2752eea3517ddecb60317cb2952a543ae40f66141a3a0cf1b1e12d716a2d05"
        }
    })
    const data = await res.json();
    return(data.data[0])
}
  
  export default async function Head({ params }: {params: {slug: string}}) {
    const post = await getPost(params.slug)

    if (!post) return;
    return (
      <>
        <title>{post.attributes.Title}</title>
        <meta name="description" content={post.attributes.Description} />
      </>
    )
  }