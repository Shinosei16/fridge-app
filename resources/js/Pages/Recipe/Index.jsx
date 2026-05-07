import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [recipes, setRecipes] = useState([])

    const fetchRecipes = async () => {
        const response = await axios.get('/api/recipes')
        setRecipes(response.data)
    }

    const handleDelete = async (id) => {
        await axios.delete(`/api/recipes/${id}`)
        fetchRecipes()
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    return (
        <AuthenticatedLayout>
            <Head title="レシピ一覧" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">レシピ一覧</h2>
                            <a href="/recipes/create" className="bg-blue-500 text-white rounded p-2 px-4">
                                + 追加
                            </a>
                        </div>
                        {recipes.map(recipe => (
                            <div key={recipe.id} className="flex justify-between items-center border-b py-2">
                                <a href={`/recipes/${recipe.id}`} className="text-blue-500 underline">
                                    {recipe.title}
                                </a>
                                <button
                                    onClick={() => handleDelete(recipe.id)}
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