import { useState, useEffect } from 'react'
import axios from 'axios'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'

export default function Index() {
    const [recipes, setRecipes] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [draggedRecipe, setDraggedRecipe] = useState(null)

    const fetchRecipes = async () => {
        const response = await axios.get('/api/recipes')
        setRecipes(response.data)
    }

    useEffect(() => {
        fetchRecipes()
    }, [])

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const formatDate = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }

    const getRecipesForDate = (dateStr) => {
        return recipes.filter(recipe => 
            recipe.meal_plan && recipe.meal_plan.planned_date === dateStr
        )
    }

    const getUnscheduledRecipes = () => {
        return recipes.filter(recipe => !recipe.meal_plan || !recipe.meal_plan.planned_date)
    }

    const handleDragStart = (recipe) => {
        setDraggedRecipe(recipe)
    }

    const handleDrop = async (dateStr) => {
        if (!draggedRecipe) return
        
        if (draggedRecipe.meal_plan) {
            await axios.put(`/api/meal-plans/${draggedRecipe.meal_plan.id}`, {
                planned_date: dateStr
            })
        } else {
            await axios.post('/api/meal-plans', {
                recipe_id: draggedRecipe.id,
                planned_date: dateStr
            })
        }
        
        setDraggedRecipe(null)
        fetchRecipes()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    return (
        <AuthenticatedLayout>
            <Head title="カレンダー" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">カレンダー</h2>

                        {/* 月移動 */}
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={prevMonth} className="bg-gray-200 rounded px-3 py-1">←</button>
                            <span className="font-bold text-lg">
                                {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                            </span>
                            <button onClick={nextMonth} className="bg-gray-200 rounded px-3 py-1">→</button>
                        </div>

                        {/* カレンダー */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['日', '月', '火', '水', '木', '金', '土'].map(day => (
                                <div key={day} className="text-center text-sm font-bold py-1">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-6">
                            {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                                const day = i + 1
                                const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
                                const dayRecipes = getRecipesForDate(dateStr)
                                return (
                                    <div
                                        key={day}
                                        onDrop={() => handleDrop(dateStr)}
                                        onDragOver={handleDragOver}
                                        className="border rounded min-h-16 p-1"
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{day}</div>
                                        {dayRecipes.map(recipe => (
                                            <div
                                                key={recipe.id}
                                                draggable
                                                onDragStart={() => handleDragStart(recipe)}
                                                className="bg-blue-100 text-blue-700 text-xs rounded p-1 mb-1 cursor-grab"
                                            >
                                                {recipe.title}
                                            </div>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>

                        {/* 未定のレシピ */}
                        <div
                            onDrop={async () => {
                                if (!draggedRecipe || !draggedRecipe.meal_plan) return
                                await axios.put(`/api/meal-plans/${draggedRecipe.meal_plan.id}`, {
                                    planned_date: null
                                })
                                setDraggedRecipe(null)
                                fetchRecipes()
                            }}
                            onDragOver={handleDragOver}
                            className="min-h-16 border-2 border-dashed border-gray-300 rounded p-2"
                        >
                            <p className="font-bold mb-2">未定のレシピ（ドラッグして日付に配置）</p>
                            <div className="flex flex-wrap gap-2">
                                {getUnscheduledRecipes().map(recipe => (
                                    <div
                                        key={recipe.id}
                                        draggable
                                        onDragStart={() => handleDragStart(recipe)}
                                        className="border-2 border-dashed border-gray-300 rounded p-2 cursor-grab text-sm"
                                    >
                                        {recipe.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}