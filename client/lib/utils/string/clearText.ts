import sanitizer from "sanitize-html"

export const textCleaner = (textWithHTML: string): string => {
  return sanitizer(textWithHTML, {
    allowedTags: [], // Specify allowed tags here if needed
  })
}

export const removeTrailingSlash = (url: string) => {
  return url.replace(/\/+$/, "")
}
