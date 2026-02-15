'use client'

import React, { useState } from 'react'
import Link from 'next/link'

// Q&A Accordion Item
function QAItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full max-w-xs bg-[#a8a8a8] text-white text-sm py-2 px-4 text-center hover:bg-[#888] transition-colors"
      >
        {question}
      </button>
      <div className={`py-3 px-4 text-sm text-gray-600 ${isOpen ? 'block' : 'hidden'}`}>
        {answer}
      </div>
    </div>
  )
}

// Image Placeholder with X
function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-gray-300 bg-white relative ${className}`}>
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100" y2="100" stroke="#ccc" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#ccc" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

// Screw/bolt decoration
function ScrewButton() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border border-gray-300 shadow-md flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border border-gray-400" />
    </div>
  )
}

export default function FeaturedPage() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] text-gray-800 font-light relative overflow-hidden">
      {/* Background watermark numbers */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-5">
        <span className="absolute left-20 top-1/3 text-[20rem] font-bold text-gray-400">2</span>
        <span className="absolute left-40 top-1/2 text-[15rem] font-bold text-gray-400">3</span>
      </div>

      {/* Top Section - Film Synopsis */}
      <section className="p-8 md:p-12 relative z-10">
        {/* Header text */}
        <div className="text-center mb-8 max-w-lg mx-auto">
          <p className="text-xs text-gray-500 leading-relaxed">
            [FILM SYNOPSIS]Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
            suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus
            vel facilisis. [FILM SYNOPSIS]
          </p>
        </div>

        {/* Two image placeholders */}
        <div className="flex gap-6 mb-16 max-w-md">
          <ImagePlaceholder className="w-40 h-40" />
          <ImagePlaceholder className="w-48 h-40" />
        </div>
      </section>

      {/* Bottom Section - Q&A, Face, Form */}
      <section className="px-8 md:px-12 pb-8 relative z-10">
        <div className="grid grid-cols-12 gap-4 items-start">

          {/* Q&A Section - Left */}
          <div className="col-span-12 md:col-span-4">
            <h3 className="mb-6">
              <span className="text-xl font-light tracking-wide">question&</span>
              <span className="font-bold text-3xl tracking-wide">ANSWER</span>
            </h3>

            <QAItem
              question="question"
              answer="answer"
              defaultOpen={true}
            />
            <QAItem
              question="question"
              answer="answer"
            />
            <QAItem
              question="question"
              answer="answer"
            />
          </div>

          {/* Center - Face illustration */}
          <div className="col-span-12 md:col-span-4 flex items-center justify-center relative">
            {/* Dots around face */}
            <div className="absolute top-8 left-1/4 w-2 h-2 bg-black rounded-full" />
            <div className="absolute top-12 left-[20%] w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute top-20 right-1/4 w-2 h-2 bg-black rounded-full" />
            <div className="absolute top-24 right-[30%] w-1 h-1 bg-black rounded-full" />
            <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-black rounded-full" />
            <div className="absolute bottom-24 left-[40%] w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-black rounded-full" />

            <svg viewBox="0 0 120 180" className="w-56 h-80">
              {/* Face outline */}
              <ellipse cx="60" cy="100" rx="40" ry="55" fill="none" stroke="#333" strokeWidth="1.5" />

              {/* Hair/top curves */}
              <path d="M25 65 Q40 35 60 30 Q80 35 95 65" fill="none" stroke="#333" strokeWidth="1.5" />
              <path d="M30 58 Q45 32 60 28 Q75 32 90 58" fill="none" stroke="#333" strokeWidth="1.5" />
              <path d="M35 52 Q50 30 60 27 Q70 30 85 52" fill="none" stroke="#333" strokeWidth="1.5" />
              <path d="M40 48 Q55 30 60 28 Q65 30 80 48" fill="none" stroke="#333" strokeWidth="1.5" />

              {/* Eyebrows */}
              <path d="M38 75 Q48 70 55 75" fill="none" stroke="#333" strokeWidth="1" />
              <path d="M65 75 Q72 70 82 75" fill="none" stroke="#333" strokeWidth="1" />

              {/* Eyes - almond shaped */}
              <path d="M40 85 Q48 78 55 85 Q48 92 40 85" fill="none" stroke="#333" strokeWidth="1.5" />
              <path d="M65 85 Q72 78 80 85 Q72 92 65 85" fill="none" stroke="#333" strokeWidth="1.5" />

              {/* Nose */}
              <path d="M60 88 L57 108 Q60 112 63 108 L60 88" fill="none" stroke="#333" strokeWidth="1" />

              {/* Mouth/lips */}
              <path d="M45 130 Q52 125 60 128 Q68 125 75 130" fill="none" stroke="#333" strokeWidth="1.5" />
              <path d="M48 130 Q54 135 60 133 Q66 135 72 130" fill="none" stroke="#333" strokeWidth="1.5" />

              {/* Beauty marks */}
              <circle cx="35" cy="95" r="2" fill="#333" />
              <circle cx="85" cy="95" r="2" fill="#333" />
              <circle cx="60" cy="145" r="2" fill="#333" />
            </svg>
          </div>

          {/* Form Section - Right */}
          <div className="col-span-12 md:col-span-4 relative">
            {/* Screw buttons on the right edge */}
            <div className="absolute -right-4 top-0 space-y-6 hidden md:block">
              <ScrewButton />
              <ScrewButton />
              <ScrewButton />
              <ScrewButton />
              <ScrewButton />
              <ScrewButton />
            </div>

            <div className="space-y-3 max-w-sm">
              {/* Name/email input */}
              <div className="border border-gray-400 bg-white/50 p-4 h-24">
                <span className="text-sm text-gray-500">name/email/etc</span>
              </div>

              {/* Empty input */}
              <div className="border border-gray-400 bg-white/50 p-4 h-12" />

              {/* Where did u hear */}
              <div className="border border-gray-400 bg-white/50 p-4 h-12">
                <span className="text-sm text-gray-500">where did u hear about us</span>
              </div>

              {/* Empty input */}
              <div className="border border-gray-400 bg-white/50 p-4 h-12" />

              {/* Newsletter signup */}
              <div className="border border-gray-400 bg-white/50 p-4">
                <span className="text-sm text-gray-500 block mb-2">sign up for newsletter</span>
                <div className="h-24 border-t border-gray-300 mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex justify-between items-center px-8 md:px-12 py-8 mt-8">
        <span className="text-sm text-gray-500">drywall limited</span>
        <span className="text-sm text-gray-500">older</span>
      </footer>
    </main>
  )
}
