import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getParams } from '../../commonUtility/Utility'
import Link from 'next/link'
import Footer from '../../components/Footer'

export default function Search (initialData){
    const router = useRouter()
    return(
        <>
        <div className="container">
            <Head>
                <title>Search results for: {router.query.searchTerm}</title>
                <meta name="description" content={initialData.searchResult.map((data,index) => data.title + ' ')}></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <p>Go <Link href="/"><a>home</a></Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>
            {
                initialData.searchResult.map((data,index)=>{
                    return(
                        <div key={index}>
                            <h3>{data.title}</h3>    
                            <Image src={data.images.original.url} alt="Searched Images" width={360} height={250} />              
                        </div>
                    )
                })
            }
        </div>
          <Footer/>
        </>
    )
}

export async function getServerSideProps(context){
    const searchTerm = context.query.searchTerm
    const url = getParams(searchTerm)
    let searchResult = await fetch(url)
    searchResult = await searchResult.json()
    return {
      props:
         {
          searchResult : searchResult.data
         }
    }
  }