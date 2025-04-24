import React from 'react'

function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-12 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg mb-4">
          Welcome to <span className="font-semibold">StyleVerse</span> — your go-to destination for trendy and comfortable fashion.
        </p>

        <p className="text-lg mb-4">
          Our mission is to empower self-expression through fashion. Whether you're into bold streetwear or minimalist basics, we’ve got something for you.
        </p>

        <p className="text-lg mb-4">
          Our products are made with care, using ethically sourced materials.
        </p>

        <p className="text-lg mb-8">
          Thank you for being part of our journey. We’re more than a brand — we’re a community of creators, dreamers, and style lovers.
        </p>

        <div className="text-center">
          <span className="text-md font-medium">📍 Based in San Francisco, CA</span>
          <br />
          <span className="text-md font-medium">📦 Shipping Worldwide</span>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
