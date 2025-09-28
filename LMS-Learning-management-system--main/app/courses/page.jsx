'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Search, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import CourseData from '@/db/CourseData'
import Link from 'next/link'

const CoursesPage = () => {
  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(CourseData)
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const hoverCard = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    }
  }

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-100 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Explore All
              </span>{' '}
              <span className="text-indigo-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete catalog of expert-led programs to find your perfect match
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Courses Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">
                {searchQuery ? "No courses match your search" : "No courses available"}
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={item}
                    layout
                  >
                    <motion.div
                      className="h-full bg-white rounded-xl overflow-hidden border border-gray-200 group shadow-md hover:shadow-lg transition-shadow"
                      whileHover="hover"
                      initial="rest"
                      animate="rest"
                      variants={hoverCard}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                        
                        <Link href={`/courses/${course.slug}`} passHref>
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer font-medium"
                          >
                            <span>View Details</span>
                            <ChevronRight size={18} className="ml-1" />
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CoursesPage