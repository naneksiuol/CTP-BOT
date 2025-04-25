"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Search,
  Clock,
  Award,
  Users,
  BarChart2,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TradeAssistant } from "@/components/TradeAssistant"

export default function UniversityPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter courses based on search query
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Image Container */}
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_pz9x71pz9x71pz9x.jpg-sqMt2vX0nnDh2Hw9U0HQVxUUEMA6Ri.jpeg")',
            backgroundSize: "contain",
            backgroundPosition: "center center",
            height: "100%",
            width: "100%",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-[rgba(10,14,23,0.85)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[rgba(10,14,23,0.95)]">
          <div className="container flex h-14 items-center">
            <Link className="flex items-center justify-center" href="/">
              <TrendingUp className="h-6 w-6 mr-2 text-cyan-400" />
              <span className="font-bold text-cyan-100">Cyber Trader Pro</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
              <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/">
                Home
              </Link>
              <Link
                className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
                href="/pro-predictor"
              >
                Pro Predictor
              </Link>
              <Link
                className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/about">
                About
              </Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-12 w-12 text-cyan-400 mr-3" />
              <h1 className="text-4xl font-bold text-cyan-100">Cyber Trader Pro University</h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
              Master the art and science of trading with our comprehensive educational resources
            </p>

            <div className="relative w-full max-w-2xl mt-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for courses, topics, or trading concepts..."
                className="pl-10 bg-[rgba(10,14,23,0.7)] border-cyan-500/20 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="instructor">AI Instructor</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="certification">Certification</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => <CourseCard key={index} course={course} />)
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">No courses found</h3>
                    <p className="text-gray-400">Try adjusting your search query</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="instructor">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <TradeAssistant />
                </div>

                <div className="space-y-6">
                  <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-cyan-100">About Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-cyan-100">AI Trading Instructor</h3>
                          <p className="text-gray-400">Cyber Trader Pro University</p>
                        </div>
                      </div>

                      <p className="text-gray-300">
                        Your AI Trading Instructor has been trained on comprehensive trading knowledge, including
                        technical analysis, fundamental analysis, risk management, and trading psychology. Ask any
                        trading-related question to receive educational guidance.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-gray-300">Technical Indicators</span>
                        </div>
                        <div className="flex items-center">
                          <BarChart2 className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-gray-300">Chart Patterns</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-gray-300">Risk Management</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-cyan-400 mr-2" />
                          <span className="text-gray-300">Trading Psychology</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                    <CardHeader>
                      <CardTitle className="text-cyan-100">Popular Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {popularTopics.map((topic, index) => (
                          <li key={index}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-left text-gray-300 hover:text-cyan-100 hover:bg-[rgba(10,14,23,0.7)]"
                              onClick={() => {
                                // This would ideally trigger a question to the AI instructor
                                // For now, we'll just log it
                                console.log(`Ask about: ${topic}`)
                              }}
                            >
                              <ChevronRight className="h-4 w-4 mr-2 text-cyan-400" />
                              {topic}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="certification">
              <div className="max-w-3xl mx-auto">
                <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                  <CardHeader>
                    <div className="flex items-center">
                      <Award className="h-6 w-6 text-cyan-400 mr-2" />
                      <CardTitle className="text-cyan-100">Cyber Trader Pro Certification</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">
                      Demonstrate your trading knowledge and skills with our official certification
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-300">
                      Our certification program is designed to validate your understanding of trading concepts,
                      technical analysis, risk management, and market dynamics. Complete the required courses and pass
                      the certification exam to earn your Cyber Trader Pro Certification.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-cyan-100 mb-2">Certification Requirements</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Complete all core courses
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Pass the certification exam with a score of 80% or higher
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Complete at least one specialization track
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[rgba(10,14,23,0.7)] p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-cyan-100 mb-2">Certification Benefits</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Digital certificate and badge for your profile
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Access to advanced trading tools and features
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 text-cyan-400 mt-1 mr-2" />
                            Exclusive community access with other certified traders
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                        Start Certification Path
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {certificationTracks.map((track, index) => (
                    <Card key={index} className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
                      <CardHeader>
                        <CardTitle className="text-cyan-100 text-lg">{track.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm mb-4">{track.description}</p>
                        <Badge className="bg-cyan-500/20 text-cyan-100">{track.level}</Badge>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full border-cyan-500/20 text-cyan-100">
                          View Track
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

interface Course {
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  topics: string[]
  image?: string
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20 overflow-hidden flex flex-col">
      <div className="h-40 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center">
        <BookOpen className="h-16 w-16 text-cyan-400/50" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-cyan-100">{course.title}</CardTitle>
          <Badge
            className={`
          ${
            course.level === "Beginner"
              ? "bg-green-500/20 text-green-400"
              : course.level === "Intermediate"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }
        `}
          >
            {course.level}
          </Badge>
        </div>
        <CardDescription className="text-gray-300">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-gray-400 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          {course.duration}
        </div>
        <div className="flex flex-wrap gap-2">
          {course.topics.slice(0, 3).map((topic, index) => (
            <Badge key={index} variant="outline" className="bg-[rgba(10,14,23,0.5)] text-gray-300">
              {topic}
            </Badge>
          ))}
          {course.topics.length > 3 && (
            <Badge variant="outline" className="bg-[rgba(10,14,23,0.5)] text-gray-300">
              +{course.topics.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
          Start Course
        </Button>
      </CardFooter>
    </Card>
  )
}

interface Resource {
  title: string
  description: string
  type: "Guide" | "Cheatsheet" | "Video" | "Tool"
  link: string
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="bg-[rgba(26,31,45,0.8)] border-cyan-500/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-cyan-100">{resource.title}</CardTitle>
          <Badge
            className={`
          ${
            resource.type === "Guide"
              ? "bg-blue-500/20 text-blue-400"
              : resource.type === "Cheatsheet"
                ? "bg-green-500/20 text-green-400"
                : resource.type === "Video"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-purple-500/20 text-purple-400"
          }
        `}
          >
            {resource.type}
          </Badge>
        </div>
        <CardDescription className="text-gray-300">{resource.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" className="w-full border-cyan-500/20 text-cyan-100">
          Access Resource
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const courses: Course[] = [
  {
    title: "Technical Analysis Fundamentals",
    description: "Learn the core concepts of technical analysis and chart reading",
    level: "Beginner",
    duration: "4 weeks",
    topics: ["Chart Patterns", "Support & Resistance", "Trend Analysis", "Candlestick Patterns"],
  },
  {
    title: "Advanced Indicator Strategies",
    description: "Master complex technical indicators and develop trading strategies",
    level: "Advanced",
    duration: "6 weeks",
    topics: ["MACD", "RSI", "Bollinger Bands", "Ichimoku Cloud", "Fibonacci", "Volume Analysis"],
  },
  {
    title: "Risk Management Mastery",
    description: "Learn essential risk management techniques to protect your capital",
    level: "Intermediate",
    duration: "3 weeks",
    topics: ["Position Sizing", "Stop Loss Strategies", "Risk-Reward Ratio", "Portfolio Management"],
  },
  {
    title: "Trading Psychology",
    description: "Understand the psychological aspects of trading and develop mental resilience",
    level: "Intermediate",
    duration: "4 weeks",
    topics: ["Emotional Control", "Cognitive Biases", "Decision Making", "Trading Journal"],
  },
  {
    title: "Swing Trading Strategies",
    description: "Learn how to capture medium-term market moves with swing trading",
    level: "Intermediate",
    duration: "5 weeks",
    topics: ["Entry/Exit Timing", "Trend Confirmation", "Multi-Timeframe Analysis", "Trade Management"],
  },
  {
    title: "Day Trading Fundamentals",
    description: "Master the basics of intraday trading and short-term opportunities",
    level: "Advanced",
    duration: "6 weeks",
    topics: ["Scalping", "Momentum Trading", "Market Open Strategies", "Time-Based Exits"],
  },
]

const resources = [
  {
    title: "Technical Indicator Cheatsheet",
    description: "Quick reference guide for all major technical indicators",
    type: "Cheatsheet",
    link: "#",
  },
  {
    title: "Candlestick Pattern Recognition Guide",
    description: "Comprehensive visual guide to identifying candlestick patterns",
    type: "Guide",
    link: "#",
  },
  {
    title: "Risk Calculator Tool",
    description: "Interactive tool to calculate position size and risk parameters",
    type: "Tool",
    link: "#",
  },
  {
    title: "Market Structure Analysis",
    description: "Video series on identifying market structure and key levels",
    type: "Video",
    link: "#",
  },
  {
    title: "Trading Journal Template",
    description: "Structured template for tracking and analyzing your trades",
    type: "Tool",
    link: "#",
  },
  {
    title: "Trading Psychology Handbook",
    description: "Guide to managing emotions and developing a trading mindset",
    type: "Guide",
    link: "#",
  },
]

const certificationTracks = [
  {
    title: "Technical Analyst",
    description: "Specialize in chart analysis, pattern recognition, and technical indicators",
    level: "Intermediate",
  },
  {
    title: "Risk Manager",
    description: "Focus on portfolio management, risk assessment, and capital preservation",
    level: "Advanced",
  },
  {
    title: "Swing Trader",
    description: "Master the art of capturing medium-term market moves and trends",
    level: "Intermediate",
  },
]

const popularTopics = [
  "What is RSI and how to use it?",
  "How to set proper stop-loss levels?",
  "Explain the MACD indicator",
  "What is risk management in trading?",
  "How to identify support and resistance?",
  "What are Fibonacci retracements?",
  "Explain candlestick patterns",
  "How to calculate position size?",
  "What is the difference between SMA and EMA?",
]
