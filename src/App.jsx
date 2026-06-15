import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './features/counterSlice'
import { Toaster, toast } from 'sonner'
import { Plus, Minus, BellRing } from 'lucide-react'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const handleNotify = () => {
    toast('Action completed!', {
      description: 'Lucide & Sonner working seamlessly in React.',
      icon: <BellRing className="w-5 h-5 text-indigo-500" />,
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Vite + React</h1>
        <p className="text-slate-500 mb-6">Redux + Tailwind + Router</p>

        {/* Redux State Counter */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={() => dispatch(decrement())}
            className="p-3 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <Minus className="w-6 h-6" />
          </button>
          
          <span className="text-4xl font-mono font-bold text-slate-800">{count}</span>

          <button
            onClick={() => dispatch(increment())}
            className="p-3 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Sonner Toast Trigger */}
        <button
          onClick={handleNotify}
          className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
        >
          Trigger Notification
        </button>
      </div>
      
      {/* Toast Container */}
      <Toaster position="bottom-right" richColors />
    </div>
  )
}

export default App