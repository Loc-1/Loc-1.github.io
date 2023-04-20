import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import photos from '@/data/photoData'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { PageSEO } from '@/components/SEO'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

export default function Gallery() {
  const [index, setIndex] = useState(-1)
  const slides = photos.map(({ src, width, height }) => ({
    src,
    width,
    height,
  }))
  return (
    <>
      <PageSEO title={`Gallery - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Gallery
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase of my digital and film photos, enjoy~
          </p>
        </div>
        <div className="container py-12">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <p className="divide-y text-2xl leading-7 text-gray-500 dark:text-gray-400">
              Asahi Pentax K1000
            </p>
            <PhotoAlbum photos={photos} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />
            <Lightbox
                slides={slides}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Thumbnails]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
