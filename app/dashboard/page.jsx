import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import CardBlog from '@/components/CardBlog'
import SearchContent from '@/components/SearchContent'
import Pagination from '@/components/Pagination'
import { cookies } from 'next/headers'

const getPosts = async (email, query, currentPage) => {
    try {
        let data

        if (query) {
          data = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}/${currentPage}/${query}`, {
            headers: { Cookie: cookies().toString() },
            cache: "no-store",
          })  
        } else {
          data = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}/${currentPage}`, {
            headers: { Cookie: cookies().toString() },
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

const DashboardPage = async({searchParams}) => {

    const session = await getServerSession(authOptions)
    const query = searchParams?.query || ""

    const currentPage = Number(searchParams?.page) || 1;

    const {posts, totalPages} = await getPosts(session.user.email, query, currentPage)

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

export default DashboardPage