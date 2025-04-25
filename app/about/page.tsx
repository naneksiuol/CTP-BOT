import Link from "next/link"
import { TrendingUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#0a0e17] border-b border-gray-800">
        <Link className="flex items-center justify-center" href="/">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
          <span className="font-bold">Cyber Trader Pro</span>
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
          <Link className="text-sm font-medium text-gray-200 hover:text-blue-400 transition-colors" href="/faq">
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section with First Image */}
        <section className="relative w-full py-8 md:py-12 lg:py-16">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_dxd10ndxd10ndxd1.jpg-6WMUBHh4iTavx0fxMxT5i3E53zRv32.jpeg")',
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 z-1 bg-gradient-to-br from-[rgba(10,14,23,0.95)] to-[rgba(26,31,45,0.85)]" />
          <div className="container relative z-10 px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6 text-white">
              About Cyber Trader Pro
            </h1>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              Welcome to <strong>Cyber Trader Pro</strong>, the cutting-edge trading platform designed to empower modern
              investors with advanced AI-driven tools and insights. Our mission is to help you navigate the complexities
              of the financial markets with precision, confidence, and ease.
            </p>
          </div>
        </section>

        {/* What is Cyber Trader Pro Section with Second Image */}
        <section className="relative w-full py-8 md:py-12 lg:py-16">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_y0r8h4y0r8h4y0r8.jpg-jybpRDvdBr3C9nCDpXj4OIytOvsN9R.jpeg")',
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 z-1 bg-gradient-to-br from-[rgba(10,14,23,0.95)] to-[rgba(26,31,45,0.85)]" />
          <div className="container relative z-10 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-white">
              What is Cyber Trader Pro?
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4">
              Cyber Trader Pro is an AI-powered trading analysis platform that combines advanced machine learning
              algorithms, multi-timeframe analysis, and robust risk management tools to provide you with actionable
              insights. Whether you're trading stocks, forex, cryptocurrencies, or commodities, our platform is designed
              to help you predict market trends, optimize your strategies, and make informed decisions.
            </p>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              Our <strong className="text-blue-400">Pro Predictor</strong> feature allows you to enter ticker symbols
              (e.g., AAPL, GOOGL, MSFT) and run short-term or long-term analyses, giving you a clear view of potential
              market movements.
            </p>
          </div>
        </section>

        {/* Meet the Creators Section */}
        <section className="relative w-full py-8 md:py-12 lg:py-16 bg-[#0a0e17]">
          <div className="container relative z-10 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-white">
              Meet the Creators
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4">
              Cyber Trader Pro was brought to life by <strong className="text-blue-400">Kenan Blackmon</strong> and{" "}
              <strong className="text-blue-400">Toney Converse</strong>, two visionary developers with a passion for
              finance and technology.
            </p>
            <ul className="list-disc list-inside max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              <li className="mb-4">
                <strong className="text-blue-400">Kenan Blackmon</strong>: A seasoned software engineer with expertise
                in AI and machine learning, Kenan has a proven track record of developing innovative solutions for the
                financial industry. His dedication to creating user-friendly, powerful tools has been instrumental in
                shaping Cyber Trader Pro.
              </li>
              <li className="mb-4">
                <strong className="text-blue-400">Toney Converse</strong>: A financial analyst and data scientist, Toney
                brings a deep understanding of market dynamics and risk management. His insights into trading strategies
                and market behavior have been crucial in designing a platform that meets the needs of both novice and
                experienced traders.
              </li>
            </ul>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              Together, Kenan and Toney have combined their skills to create a platform that bridges the gap between
              technology and trading, empowering users to achieve their financial goals.
            </p>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="relative w-full py-8 md:py-12 lg:py-16">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_k7pchlk7pchlk7pc.jpg-K1lPyBmOKod17hcWYVREFuYMtQ5gGf.jpeg")',
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="absolute inset-0 z-1 bg-gradient-to-br from-[rgba(10,14,23,0.95)] to-[rgba(26,31,45,0.85)]" />
          <div className="container relative z-10 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-white">Our Vision</h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              At Cyber Trader Pro, we believe that everyone deserves access to advanced trading tools and insights. Our
              platform is designed to democratize trading analysis, making it accessible to traders of all levels. By
              leveraging the power of AI, we aim to help you stay ahead of the market and make smarter, data-driven
              decisions.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative w-full py-8 md:py-12 lg:py-16 bg-[#0a0e17]">
          <div className="container relative z-10 px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-4 text-white">
              Latest Trading Analysis Features
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4">
              Our commitment to innovation has led to the development of cutting-edge trading analysis tools:
            </p>
            <ul className="list-disc list-inside max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
              <li className="mb-4">
                <span className="font-semibold text-blue-400">Real-time Market Sentiment Analysis:</span> Our AI
                algorithms now process vast amounts of market data to provide instant insights into market sentiment.
              </li>
              <li className="mb-4">
                <span className="font-semibold text-blue-400">Advanced Risk Management:</span> We've enhanced our
                stop-loss and take-profit calculations to offer even more precise risk control.
              </li>
              <li>
                <span className="font-semibold text-blue-400">Multi-Asset Correlation:</span> Our new feature analyzes
                correlations between different asset classes to identify potential market trends and opportunities.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
