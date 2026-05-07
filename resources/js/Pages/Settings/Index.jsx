import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [dislikedIngredients, setDislikedIngredients] = useState([])
    const [name, setName] = useState('')

    const fetchDislikedIngredients = async () => {
        const response = await axios.get('/api/disliked-ingredients')
        setDislikedIngredients(response.data)
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        await axios.post('/api/disliked-ingredients', { name })
        setName('')
        fetchDislikedIngredients()
    }

    const handleDelete = async (id) => {
        await axios.delete(`/api/disliked-ingredients/${id}`)
        fetchDislikedIngredients()
    }

    useEffect(() => {
        fetchDislikedIngredients()
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title="設定" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">使いたくない食材</h2>
                        
                        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                            <input
                                type="text"
                                placeholder="食材名"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="border rounded p-2 flex-1"
                            />
                            <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4">
                                追加
                            </button>
                        </form>

                        {dislikedIngredients.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b py-2">
                                <span>{item.name}</span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white rounded px-3 py-1 text-sm"
                                >
                                    削除
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}