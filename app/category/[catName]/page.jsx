import React from 'react'
import CardBlog from '@/components/CardBlog'
import SearchContent from '@/components/SearchContent'
import Pagination from '@/components/Pagination'

const getPosts = async (catName, query, currentPage) => {
  try {
      let data

      if (query) {
        data = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}/${currentPage}/${query}`, {
          cache: "no-store",
        })  
      } else {
        data = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}/${currentPage}`, {
          cache: "no-store",
        })
      }
      const res = await data.json()
      const posts = res.posts;
      const totalPages = res.totalPages
      
      return { posts, totalPages }
  } catch (error) {
      console.log(error)
  }
}


const CategoryPage = async({params, searchParams}) => {

    const catName = params.catName
    
    const query = searchParams?.query || ""

    const currentPage = Number(searchParams?.page) || 1;

    const {posts, totalPages} = await getPosts(catName, query, currentPage)

    return (
      <div>
        <SearchContent />
        <div className="grid md:grid-cols-2 gap-3">
          {posts.map((item) => (
            <CardBlog key={item.id} post={item} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    )
}

export default CategoryPage