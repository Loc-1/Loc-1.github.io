import Link from '@/components/Link'

const Paper = ({ author, title, conference, year, url, page }) => {
  return (
    <div className="my-3">
      <div className="flex flex-row text-xl">
        <span className="text-gray-500 dark:text-gray-400">{author} <Link href={url} className="text-primary-color dark:text-primary-color-dark no-underline">
          {title}
        </Link> {conference} {page} {year} </span>
      </div>
      <div className="font-medium text-2xl justify-center dark:text-gray-600 text-gray-200  text-center">
        &#126;&#126;&#126;
      </div>
    </div>
  )
}

export default Paper