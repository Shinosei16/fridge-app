import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Show({ id }) {
    const [recipe, setRecipe] = useState(null)

    const fetchRecipe = async () => {
        const response = await axios.get(`/api/recipes/${id}`)
        console.log(response.data)
        setRecipe(response.data)
    }

    const handleComplete = async () => {
        if (!confirm('作成済みにしますか？冷蔵庫の食材が減ります。')) return
        await axios.post(`/api/recipes/${id}/complete`)
        alert('作成済みにしました！')
        window.location.href = '/fridge'
    }

    useEffect(() => {
        fetchRecipe()
    }, [])

    if (!recipe) return <div>読み込み中...</div>

    return (
        <AuthenticatedLayout>
            <Head title={recipe.title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{recipe.title}</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleComplete}
                                    className="bg-green-500 text-white rounded p-2 px-4"
                                >
                                    作成済み
                                </button>
                                <button href="/recipes" className="bg-blue-500 text-white rounded p-2 px-4">
                                    一覧に戻る
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold mb-2">手順</p>
                            <p className="whitespace-pre-line">{recipe.description}</p>
                        </div>

                        <div className="mb-6">
                            <p className="font-bold mb-2">使用食材</p>
                            {recipe.recipe_ingredients && recipe.recipe_ingredients.map((ingredient, index) => (
                                <div key={index} className="flex gap-2 items-center mb-2">
                                    <span className={`text-xs px-2 py-1 rounded ${ingredient.is_seasoning ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {ingredient.is_seasoning ? '調味料' : '食材'}
                                    </span>
                                    <span>{ingredient.name}</span>
                                    <span className="text-gray-500">{ingredient.quantity}{ingredient.unit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}