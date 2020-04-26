import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Router from 'next/router'

export default function Filter() {
  const goBack = () => Router.back()
  return (
    <>
      <div onClick={goBack}>Назад</div>
      <div onClick={goBack}>V</div>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
