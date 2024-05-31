export const defaultPosterUrl = 'https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg'; 

export const validateForm = (fields, movieToUpdate) => {
  let validatedMovie = {...movieToUpdate}
  for (const [key, value] of Object.entries(fields)) {
    if(value !== '') {
      validatedMovie = {...validatedMovie, [key]: value}
    }
  }
  return validatedMovie
}