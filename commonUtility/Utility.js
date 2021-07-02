
export const getParams = (searchTerm) => {
    const usp = new URLSearchParams()
    usp.set('q',searchTerm)
    usp.set('api_key','SuOpx1ELZNYJgP3Zge0Tgba5YJkZovJv')
    usp.set('limit',10)
    const queryParams = usp.toString()
    const url = `https://api.giphy.com/v1/gifs/search?${queryParams}`
    return url
  }

