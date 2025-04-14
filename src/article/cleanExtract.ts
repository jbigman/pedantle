export const cleanExtract = (text: string): string => {
  if(!text) return '' // Si le texte est vide, retourne une chaîne vide

  const newText = text.split('== Notes et références')[0]
  return newText
    .replace(/^==.*==$/gm, '') // Supprime les lignes de sous-titres
    .replace(/\n{2,}/g, '\n') // Réduit les multiples \n à un seul
    .trim() // Supprime les espaces ou \n au début et à la fin
}
