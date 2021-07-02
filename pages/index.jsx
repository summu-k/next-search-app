import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import {getParams} from '../commonUtility/Utility'
import Link from 'next/link'
import Footer from '../components/Footer'

export default function Home(initialData) {

  const [searchForm, setSearchForm] = useState({})
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('superman')
  
  // This hook runs after getStaticProps has returned its value
  React.useEffect(()=>{
    setSearchResults(initialData.searchResult.data)
  },[initialData])

  const handleInputs = (e) => {
    const {name,value} = e.target
    setSearchForm({...searchForm,[name]:value})
  }
  
  const search = async (event) => {
    event.preventDefault()
    const url = getParams(searchForm.searchTerm)
    let searchResult = await fetch(url)
    searchResult = await searchResult.json()
    setSearchResults(searchResult.data)
    setSearchTerm(searchForm.searchTerm)
  }

  return (
    <>
    <div className={"container"}>
      <Head>
        <title>Search App</title>
        <meta name="description" content="This is an example of a meta description. This will often show up in search results." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Search App</h1>
      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text" required/>
        <button>Search</button>
      </form>
      <p>Share this search with others:
        <Link
              href="/search/[pid]"
              as={`/search/${searchTerm}`}>
                <a> 
                  {`http://localhost:3000/search/${searchTerm}`}
                </a>
        </Link>
      </p>
      <h1>Search results for: {searchTerm}</h1>
      <a href="http://localhost:3000/search/batman">Go here</a>

      {
        searchResults.map((data,index)=>{
            return(
              <div key={index}>
                <h3>{data.title}</h3>
                <Image src={data.images.original.url} alt="Vercel Logo" width={360} height={250} />              
              </div>
            ) 
        })
      }
    </div>
    <Footer/>
    </>
  )
}

// Static generation -  use it when we need to display data from an API, but it does not necessarily have to 
// look for updated data every time the page loads, then we can statically generate a page with data.

export async function getStaticProps(){
  // fetch("https://api.giphy.com/v1/gifs/search?q=cats&api_key=SuOpx1ELZNYJgP3Zge0Tgba5YJkZovJv&limit=10").then(r=>r.json()).then(console.log)
  const url = getParams('superman')
  let searchResult = await fetch(url)
  searchResult = await searchResult.json()
  return {
    props:
       {
        searchResult : searchResult
       }
  }
}