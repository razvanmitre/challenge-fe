import Image from 'next/image'
import { useRef, useState } from 'react'

const luckyOptions = [
  'What is a minimalist entrepreneur?',
  'What is your definition of community?',
  'How do I decide what kind of business I should start?',
]

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Index = () => {
  const [formState, setFormState] = useState({
    question: 'What is The Minimalist Entrepreneur about?',
  })
  const [answerState, setAnswerState] = useState({
    value: null,
  })
  const [typing, setTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState(false)
  const textRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setAnswerState({ value: null })
    fetch(`http://127.0.0.1:3000/v1/book/question?q=${formState.question}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setLoading(false)
        setTouched(true)

        if (res.status === 200) {
          res.json().then(({ answer }) => startTypingAnswer(answer))
        } else {
          console.error(res)
          throw new Error('Server error')
        }
      })
      .catch((error) => {
        setLoading(false)
        console.error(error.message)
      })
  }

  const startTypingAnswer = (text) => {
    nextLetter(text, 0)
  }

  const nextLetter = (text, index) => {
    var interval = randomInteger(25, 50)
    setTyping(true)

    setTimeout(() => {
      const newText = text.slice(0, index++)
      setAnswerState({ value: newText })
      if (newText.length != text.length) {
        nextLetter(text, index)
      } else {
        setTyping(false)
      }
    }, interval)
  }

  const onLucky = (e) => {
    const random = Math.floor(Math.random() * luckyOptions.length)
    setFormState({ question: luckyOptions[random] })
    handleSubmit(e)
  }

  const reset = (focus = false) => {
    if (focus) {
      textRef.current.focus()
      textRef.current.select()
    }
    setTouched(false)
    setAnswerState({ value: null })
  }

  return (
    <section className="max-w-xl mx-auto px-4">
      <div className="mt-6">
        <div>
          <a href="https://www.amazon.com/Minimalist-Entrepreneur-Great-Founders-More/dp/0593192397">
            <Image
              className="h-52 w-auto mx-auto rounded-lg"
              width="600"
              height="882"
              src="/images/book.2a513df7cb86.png"
              loading="lazy"
              alt="Minimalist-Entrepreneur"
            />
          </a>
          <h1 className="text-2xl font-bold text-center mt-4">Ask My Book</h1>
        </div>
      </div>
      <div>
        <p className="text-gray-500 my-4 leading-relaxed">
          This is an experiment in using AI to make my book's content more
          accessible. Ask a question and AI'll answer it in real-time:
        </p>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <textarea
            className="py-2 px-3 rounded-lg border border-black w-full resize-none font-mono text-lg leading-normal"
            ref={textRef}
            disabled={loading}
            required
            rows="3"
            value={formState.question}
            onChange={(e) => {
              reset()
              setFormState({ ...formState, question: e.target.value })
            }}
          ></textarea>
          <div
            className={touched ? 'hidden' : 'flex gap-4 justify-center my-5'}
          >
            <button
              type="submit"
              disabled={loading}
              className="button__primary"
            >
              {loading ? 'Asking...' : ' Ask question'}
            </button>
            <button
              type="button"
              onClick={(e) => onLucky(e)}
              disabled={loading}
              className="button__secondary"
            >
              I'm feeling lucky
            </button>
          </div>
        </form>
        <p className={answerState?.value ? 'block leading-relaxed' : 'hidden'}>
          <strong>Answer:</strong>
          <span>{answerState.value}</span>
        </p>
        <button
          onClick={() => reset(true)}
          className={
            touched && !typing ? 'block button__primary mt-4' : 'hidden'
          }
          type="button"
        >
          {loading ? 'Asking...' : 'Ask another question'}
        </button>
      </div>

      <footer>
        <p className="text-gray-500 my-7 text-lg text-center">
          Project by{' '}
          <a className="underline" href="https://twitter.com/shl">
            Sahil Lavingia
          </a>{' '}
          •{' '}
          <a
            className="underline"
            href="https://github.com/slavingia/askmybook"
          >
            Fork on GitHub
          </a>
        </p>
      </footer>
    </section>
  )
}

export default Index
