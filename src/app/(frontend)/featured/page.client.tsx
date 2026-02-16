'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { NavBar } from '@/components/navigation'

type QA = {
  question: string
  answer: string
}

type Props = {
  title: string
  synopsis: string
  videoUrl: string
  longInformation?: any
  image1Url?: string
  image2Url?: string
  qa1: QA
  qa2: QA
  qa3: QA
}

const darkGray = '#333'

// Q&A Accordion Item
function QAItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-1 max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#a8a8a8] text-white py-2 px-4 text-center hover:bg-[#888] transition-colors"
        style={{ fontFamily: '"lores-12", sans-serif', fontSize: '12px', fontWeight: 'normal' }}
      >
        {question}
      </button>
      <div className={`py-3 px-4 text-sm text-center ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>
        {answer}
      </div>
    </div>
  )
}

// Simple rich text renderer
function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null

  if (content.root?.children) {
    return (
      <div className="text-center">
        {content.root.children.map((node: any, index: number) => {
          if (node.type === 'paragraph') {
            return (
              <p key={index} className="mb-3 text-xs leading-relaxed" style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>
                {node.children?.map((child: any, childIndex: number) => {
                  if (child.type === 'text') {
                    return <span key={childIndex}>{child.text}</span>
                  }
                  return null
                })}
              </p>
            )
          }
          return null
        })}
      </div>
    )
  }

  if (typeof content === 'string') {
    return <p className="text-xs leading-relaxed text-center" style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>{content}</p>
  }

  return null
}

// Sign Up Form
function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whereDidYouHear: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!formData.name || !formData.email) {
      setMessage('Please enter both name and email.')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/sign-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setMessage('Thanks for signing up!')
        setFormData({ name: '', email: '', whereDidYouHear: '' })
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <div className="flex justify-end pr-8">
        <input
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-56 h-16 bg-white/50 border border-gray-200 text-lg text-center focus:outline-none focus:border-gray-400"
          style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}
        />
      </div>
      <div className="flex justify-end pr-[30%]">
        <input
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-56 h-24 bg-white/50 border border-gray-200 text-lg text-center focus:outline-none focus:border-gray-400"
          style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}
        />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="where did you hear about us"
          value={formData.whereDidYouHear}
          onChange={(e) => setFormData({ ...formData, whereDidYouHear: e.target.value })}
          className="w-full h-40 bg-white/50 border border-gray-200 text-lg text-center focus:outline-none focus:border-gray-400"
          style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}
        />
      </div>
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-2xl hover:scale-150 transition-all duration-300"
          style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}
        >
          {isSubmitting ? 'signing up...' : 'sign up for our newsletter'}
        </button>
      </div>
      {message && <p className="text-xs text-center" style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>{message}</p>}
    </form>
  )
}

export default function FeaturedPageClient({
  title,
  synopsis,
  videoUrl,
  longInformation,
  image1Url,
  image2Url,
  qa1,
  qa2,
  qa3,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleWatch = () => {
    if (videoRef.current) {
      videoRef.current.play()
      videoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main
      className="w-full bg-no-repeat overflow-y-auto"
      style={{
        backgroundImage: 'url(/backgrounds/featured-bg.png)',
        backgroundSize: '100% auto',
        backgroundPosition: 'top center',
        height: 'calc(100vw * 3000 / 2360)',
        fontFamily: 'Arial, sans-serif',
        color: darkGray
      }}
    >
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <NavBar className="justify-center" />
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 pt-20 pb-8 md:pt-24 md:pb-12">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Big Video Player */}
          {videoUrl && (
            <div className="w-full max-w-[605px] pl-8 md:pl-12">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full aspect-video bg-black"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Title and Watch Button */}
          <div className="flex items-baseline justify-between max-w-[605px] pl-8 md:pl-12">
            <h1 className="text-2xl font-normal" style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>{title}</h1>
            <button
              onClick={handleWatch}
              className="text-2xl hover:scale-150 transition-all duration-300"
              style={{ fontFamily: 'Arial, sans-serif', color: '#999' }}
            >
              watch
            </button>
          </div>

          {/* Synopsis - Center aligned */}
          <p className="text-xs leading-relaxed max-w-[605px] text-center pl-8 md:pl-12" style={{ fontFamily: 'Arial, sans-serif', color: darkGray }}>
            {synopsis}
          </p>

          {/* Optional Media - maintains space even when empty */}
          <div className="flex gap-4 min-h-28 pl-8 md:pl-12">
            {image1Url && (
              <div className="w-28 h-28 relative border border-gray-400">
                <Image
                  src={image1Url}
                  alt="Film image 1"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {image2Url && (
              <div className="w-28 h-28 relative border border-gray-400">
                <Image
                  src={image2Url}
                  alt="Film image 2"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Q&A Section */}
          <div className="pt-4">
            <h3 className="mb-6" style={{ color: darkGray }}>
              <span style={{ fontFamily: '"lores-12", sans-serif', fontSize: '42px', fontWeight: 'bold' }}>question</span>
              <span style={{ fontFamily: '"Good Times", sans-serif', fontSize: '42px' }}>&ANSWER</span>
            </h3>

            <QAItem
              question={qa1.question}
              answer={qa1.answer}
              defaultOpen={true}
            />
            <QAItem
              question={qa2.question}
              answer={qa2.answer}
            />
            <QAItem
              question={qa3.question}
              answer={qa3.answer}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          {/* Film Information - Center aligned, no header */}
          <div className="space-y-2 pr-4">
            <RichTextRenderer content={longInformation} />
          </div>

          {/* Sign Up Form - at the bottom */}
          <div className="mt-12 w-full">
            <SignUpForm />
          </div>
        </div>
      </div>

    </main>
  )
}
